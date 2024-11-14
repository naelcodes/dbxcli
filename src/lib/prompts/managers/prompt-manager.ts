import type {Subprocess} from 'execa';
import {StateManager} from './state-manager.js';
import type{Prompt, PromptAction} from '@common/types.js';


export class PromptManager {
	private stateManager: StateManager;
	private prompts: Map<string, Prompt>;
	private actions: Map<string, PromptAction>;

	constructor(prompts: Prompt[], promptActions: PromptAction[]) {
		this.stateManager = new StateManager();
		this.prompts = new Map<string, Prompt>(prompts.map((prompt) => [prompt.name, prompt]));
		this.actions = new Map<string, PromptAction>(
			promptActions.map((promptAction) => [promptAction.name, promptAction]),
		);
		this.registerStates();
	}
	private registerStates() {
		for (const [name, prompt] of this.prompts.entries()) {
			this.stateManager.registerState(name, prompt.state);
		}
	}

	async run(subprocess: Subprocess) {
		if (subprocess.stdout && subprocess.stdin) {
			subprocess.stdin.setDefaultEncoding('utf-8');
			subprocess.stdout.on('data', async(data) => {
				const terminalOutput = data.toString();

				// console.log(">>> termianl output :",terminalOutput);

				for (const [promptName, promptAction] of this.actions.entries()) {
					await promptAction.action(terminalOutput, subprocess, this.stateManager.useState(promptName));

					// console.log('>>> action name:',promptName);
				}
			});
			subprocess.stdout.on('end', () => {
				subprocess.stdin?.end();
			});
		}
	}
}
