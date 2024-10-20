import {NESTED_EXTENSION_TYPES} from '@directus/extensions';
import type {Command} from 'commander';
import {AbstractCommand} from './abstract.command.js';
import type {CommandInput} from '@common/types.js';

export default class GenerateCommand extends AbstractCommand {
	load(program: Command): void {
		const generateCommand = program.command('generate');
		generateCommand.description('Generate a directus extension').usage('[command] [name] [options]').alias('g');

		for (const extension of NESTED_EXTENSION_TYPES) {
			const subCommand = generateCommand.command(extension);
			subCommand.description(`Generate a new ${extension} extension`).usage('[name] [options]');

			subCommand
				.argument('<name>', 'extension name')
				.option('-d | --directory <value>', 'path to the directory in the src folder in which the extension will be generated')
				.option('--no-install', 'skip dependency installation')
				.action(async (name: string, options, command: Command) => {
					const userInputs: CommandInput[] = [];
					const commandOptions: CommandInput[] = [];

					userInputs.push({name: 'extensionName', value: name});

					commandOptions.push(
						{name: 'extensionType', value: command.name()},
						{name: 'directory', value: options.directory ? options.directory : ''},
						{name: 'install', value: options.install},
					);

					await this.action.handle(userInputs, commandOptions);
				});
		}
	}
}
