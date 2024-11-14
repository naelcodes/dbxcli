import {ESCAPE_SEQUENCE, ANSI_REGEX} from '@common/constants.js';
import type {UseState, PromptState} from '@common/types.js';
import type {Subprocess} from 'execa';

export function inputPromptAction(prompt: string, delay = 0) {
	return async (data: string, subprocess: Subprocess, usePromptState: UseState<PromptState>) => {
		const [state] = usePromptState;
		if (state().answer && data.includes(prompt)) {
			await KeyboardInput(subprocess, <string>state().answer, delay);
			await KeyboardInput(subprocess, ESCAPE_SEQUENCE.ENTER_KEY, delay);
		}
	};
}

export function selectPromptAction(prompt: string) {
	return async (data: string, subprocess: Subprocess, usePromptState: UseState<PromptState>) => {
		const [state] = usePromptState;
		if (state().answer && data.includes(prompt)) {
			await selectChoice(data, subprocess, usePromptState);
		}
	};
}

async function selectChoice(terminalOutput: string, subprocess: Subprocess, useSelectPromptState: UseState<PromptState>) {
	const [state, setState] = useSelectPromptState;
	const selectedChoice = (<string>state().promptStartLine).concat(' ', <string>state().answer);

	if (terminalOutput.includes(<string>state().promptStartLine) && !terminalOutput.replace(ANSI_REGEX, '').includes(selectedChoice)) {
		const lines = terminalOutput.replace(ANSI_REGEX, '').trim().split('\n');

		for (const line of lines) {
			const trimmedLine = line.trim();

			const splitTrimmedLine = trimmedLine.split(' ');
			const checkboxSymbol = splitTrimmedLine[0] as string;

			//is current selected choice in options
			if (splitTrimmedLine.length === 2) {
				// remove ANSI escape sequence from current selected choice and checkbox symbol
				setState({currentChoice: trimmedLine.replace(checkboxSymbol, '').replace(ANSI_REGEX, '').trim()});

				if (!(<Set<string>>state().seenChoices).has(<string>state().currentChoice)) {
					setState(({seenChoices, currentChoice}) => ({seenChoices: (<Set<string>>seenChoices).add(<string>currentChoice)}));

					if (<string>state().answer === <string>state().currentChoice) {
						// select choice
						await KeyboardInput(subprocess, ESCAPE_SEQUENCE.ENTER_KEY, 100);
					} else {
						// navigate down
						await KeyboardInput(subprocess, ESCAPE_SEQUENCE.ARROW_DOWN_KEY, 100);
					}

					break;
				}
				
			}
		}
	}
}

export async function KeyboardInput(subprocess: Subprocess, input: string, delay: number) {
	return new Promise<void>((resolve) => {
		setTimeout(() => {
			subprocess.stdin?.write(input);
			resolve();
		}, delay);
	});
}
