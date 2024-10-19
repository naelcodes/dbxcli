import type {ExtensionType} from '@directus/extensions';
import chalk from 'chalk';

export function getDoneMessage(extensionType: ExtensionType, targetDir: string, targetPath: string, packageManager: string, install: boolean) {
	let message = `
Your ${extensionType} extension has been created at ${chalk.green(targetPath)}

To start developing, run:
	${chalk.blue('cd')} ${targetDir}`;

	if (!install) {
		message += `
	${chalk.blue(`${packageManager}`)} install`;
	}

	message += `
	${chalk.blue(`${packageManager} run`)} dev

To build for production, run:
	${chalk.blue(`${packageManager} run`)} build
`;

	return message;
}
