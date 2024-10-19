import {Command} from 'commander';
import chalk from 'chalk';
import {getCliVersion} from '@lib/helpers';

export const program = new Command();

program
	.name('dbxcli')
	.usage('[commands] [arguments] [options]')
	.description('CLI tool for scaffolding Directus bundle extensions with utilities to enhance developer experience')
	.configureHelp({
		subcommandTerm: (cmd) => `${chalk.green(cmd.name())} ${cmd.usage()}`,
	})
	.version(await getCliVersion());
