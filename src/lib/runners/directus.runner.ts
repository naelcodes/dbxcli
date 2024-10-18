import type {DirectusCliPromptsAnswers} from '@common/types.js';
import {AbstractRunner} from './abstract.runner.js';
import {directusCliPromptsHandler} from '../helpers/directus-cli-prompt-handler.js';

export class DirectusRunner extends AbstractRunner<DirectusRunner> {
	private isCreateOperation = false;
	private isAddOperation = false;
	private answers?: DirectusCliPromptsAnswers;
	constructor() {
		super('directus-extension');
	}

	setRunnerName(name: string): DirectusRunner {
		this._name = name;
		return this;
	}

	setCreateCommand(): DirectusRunner {
		this.isCreateOperation = true;
		this.commandAndOptions = 'create-directus-extension@latest';
		return this;
	}

	setAddCommand(): DirectusRunner {
		this.isAddOperation = true;
		this.commandAndOptions = 'add --no-install';
		return this;
	}

	setDevCommand(): DirectusRunner {
		this.commandAndOptions = 'build -w --no-minify';
		return this;
	}

	setBuildCommand(): DirectusRunner {
		this.commandAndOptions = 'build';
		return this;
	}

	setPromptAnswers(answers: DirectusCliPromptsAnswers): DirectusRunner {
		this.answers = answers;
		return this;
	}

	override async run(): Promise<void> {
		if (this.subprocess) {
			if ((this.isAddOperation || this.isCreateOperation) && this.answers) {
				directusCliPromptsHandler(this.subprocess, this.answers);
			}
			await this.subprocess;
		}
	}
}
