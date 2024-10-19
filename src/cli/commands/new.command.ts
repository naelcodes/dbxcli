import type {Command} from 'commander';
import {AbstractCommand} from './abstract.command.js';
import type {CommandInput} from '@common/types.js';

export default class NewCommand extends AbstractCommand {
	load(program: Command): void {
		program
			.command('new')
			.usage('[name] [options]')
			.description('Scaffold a new directus bundle extension project')
			.argument('<name>', "name of the project's directory")
			.option('--no-install', 'skip dependency installation')
			.option('--no-git-init', 'skip git repository initialization')
			.option('-p | --package-manager <packageManager>', 'Specify package Manager', 'pnpm')
			.action(async (name, options) => {
				const CommandOptions: CommandInput[] = [];
				const userInputs: CommandInput[] = [];

				CommandOptions.push(
					{name: 'install', value: options.install},
					{name: 'gitInit', value: options.gitInit},
					{name: 'packageManager', value: options.packageManager},
				);

				userInputs.push({
					name: 'name',
					value: name,
				});
				await this.action.handle(userInputs, CommandOptions);
			});
	}
}
