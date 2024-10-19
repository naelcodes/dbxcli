import type {DirectusCliPromptsAnswers} from '@common/types.js';
import type {Subprocess} from 'execa';

type selectChoiceOptions = {
	terminalOutput: string;
	input: string;
	promptStartLine: string;
	subprocess: Subprocess;
	seenChoices: Set<string>;
	currentChoice: string;
};

const ESCAPE_SEQUENCE = {
	ARROW_DOWN_KEY: '\x1B[B',
	ENTER_KEY: '\n',
};

export async function directusCliPromptsHandler(subprocess: Subprocess, answers: DirectusCliPromptsAnswers) {
	const seenChoices = new Set<string>();
	const currentChoice = '';
	let isExtensionNameSet = false;

	if (subprocess.stdout && subprocess.stdin) {
		subprocess.stdin.setDefaultEncoding('utf-8');
		subprocess.stdout.on('data', async (data) => {
			const terminalOutput = data.toString();

			//console.log('>>> terminal output :', terminalOutput);

			if (answers.extensionType && terminalOutput.includes('Choose the extension type')) {
				await selectChoice({
					terminalOutput,
					input: answers.extensionType,
					promptStartLine: 'Choose the extension type',
					subprocess,
					seenChoices,
					currentChoice,
				});
			} else if (answers.extensionName && terminalOutput.includes('Choose a name for the entry')) {
				await KeyboardInput(subprocess, answers.extensionName, 500);
				await KeyboardInput(subprocess, ESCAPE_SEQUENCE.ENTER_KEY, 500);
			} else if (!isExtensionNameSet && answers.extensionName && terminalOutput.includes('Choose a name for the extension')) {
				await KeyboardInput(subprocess, answers.extensionName, 0);
				await KeyboardInput(subprocess, ESCAPE_SEQUENCE.ENTER_KEY, 0);
				isExtensionNameSet = true;
			} else if (answers.language && terminalOutput.includes('Choose the language to use')) {
				await selectChoice({
					terminalOutput,
					input: answers.language,
					promptStartLine: 'Choose the language to use',
					subprocess,
					seenChoices,
					currentChoice,
				});
			} else if (answers.path && terminalOutput.includes('Specify the path to the extension source')) {
				await KeyboardInput(subprocess, answers.path, 500);
				await KeyboardInput(subprocess, ESCAPE_SEQUENCE.ENTER_KEY, 500);
			} else if (answers.install && terminalOutput.includes('Auto install dependencies?')) {
				await KeyboardInput(subprocess, answers.install, 500);
				await KeyboardInput(subprocess, ESCAPE_SEQUENCE.ENTER_KEY, 500);
			}
		});

		subprocess.stdout.on('end', () => {
			subprocess.stdin?.end();
		});
	}
}

async function selectChoice({terminalOutput, input, promptStartLine, subprocess, seenChoices, currentChoice}: selectChoiceOptions) {
	const ansiRegex = /\u001b\[.*?m/g;
	const selectedChoice = promptStartLine.concat(' ', input);

	if (terminalOutput.includes(promptStartLine) && !terminalOutput.replace(ansiRegex, '').includes(selectedChoice)) {
		const lines = terminalOutput.replace(ansiRegex, '').trim().split('\n');

		for (const line of lines) {
			const trimmedLine = line.trim();

			const splitTrimmedLine = trimmedLine.split(' ');
			const checkboxSymbol = splitTrimmedLine[0] as string;

			//is current selected choice in options
			if (splitTrimmedLine.length === 2) {
				// remove ANSI escape sequence from current selected choice and checkbox symbol
				currentChoice = trimmedLine.replace(checkboxSymbol, '').replace(ansiRegex, '').trim();

				if (seenChoices.has(currentChoice)) {
					console.error(`${input} not found in options.`);
				} else {
					seenChoices.add(currentChoice);
					if (input === currentChoice) {
						// select choice
						await KeyboardInput(subprocess, ESCAPE_SEQUENCE.ENTER_KEY, 100);
					} else {
						// navigate down
						await KeyboardInput(subprocess, ESCAPE_SEQUENCE.ARROW_DOWN_KEY, 100);
					}
				}

				break;
			}
		}
	}
}

async function KeyboardInput(subprocess: Subprocess, input: string, delay: number) {
	return new Promise<void>((resolve) => {
		setTimeout(() => {
			subprocess.stdin?.write(input);
			resolve();
		}, delay);
	});
}
