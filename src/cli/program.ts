import {Command} from 'commander';
import chalk from 'chalk';
import {getCliVersion} from '@lib/helpers';
import {LOG_PREFIX} from '@lib/ui';

export const program = new Command();

program
	.name('dbxcli')
	.usage('[commands] [arguments] [options]')
	.description('CLI tool for scaffolding Directus bundle extensions with utilities to enhance developer experience')
	.configureHelp({
		subcommandTerm: (cmd) => `${chalk.green(cmd.name())} ${cmd.usage()}`,
		optionTerm: (option) => `${chalk.green(option.flags)}`,
		commandUsage: (cmd) => {
			const cmdName = cmd.alias() ? `${cmd.name()}|${cmd.alias()}` : cmd.name();
			return `${chalk.green(`${cmdName} ${cmd.usage()}`)}`
		},
		argumentTerm:(argument) => `${chalk.green(argument.name())}`		
	})
	.configureOutput({
		outputError: (str, write) => write(`${LOG_PREFIX.ERROR} ${str.replace('error: ','')}\n`)
	})
	.showHelpAfterError(`${LOG_PREFIX.INFO} Use ${chalk.green.bold('dbxcli [command] --help')} for more information on command usage.`)
	.version(await getCliVersion());
