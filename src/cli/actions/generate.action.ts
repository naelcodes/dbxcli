import type {CommandInput, DirectusCliPromptsAnswers, logAndAbortOptions} from '@common/types.js';
import {AbstractAction} from './abstract.action.js';
import {AsyncResultWrap, log, logAndAbort, toEnumRecord} from '@lib/utils';
import ora from 'ora';
import chalk from 'chalk';
import {EXTENSION_LANGUAGES, type NestedExtensionType} from '@directus/extensions';
import {DirectusRunner, PackageManagerRunner} from '@lib/runners';
import {detectPackageManager} from '@lib/helpers';

export default class GenerateAction extends AbstractAction {
	async handle(inputs?: CommandInput[], options?: CommandInput[]): Promise<void> {
		const spinner = ora();
		const projectPath = process.cwd();

		const [, error] = await AsyncResultWrap(async () => {
			const extensionType = options?.find((option) => option.name === 'extensionType')?.value as string as NestedExtensionType;

			let directory = options?.find((option) => option.name === 'directory')?.value as string;
			directory = directory?.startsWith('/') ? directory?.slice(1) : directory;

			const extensionName = inputs?.find((input) => input.name === 'extensionName')?.value as string;

			const extensionfullName =
				directory === '' ? extensionName : directory.endsWith('/') ? `${directory}${extensionName}` : `${directory}/${extensionName}`;

			const install = options?.find((option) => option.name === 'install')?.value as boolean;

			spinner.start(chalk.bold(`Adding ${extensionType} extension to the bundle extension`));

			const promptAnswers: DirectusCliPromptsAnswers = {
				extensionType,
				extensionName: extensionfullName,
				language: toEnumRecord(EXTENSION_LANGUAGES).TYPESCRIPT,
				path: 'src',
			};

			const packageManager = await detectPackageManager(projectPath);

			await new DirectusRunner().setAddCommand().setExecaOptions({preferLocal: true}).setPromptAnswers(promptAnswers).build().run();

			if (install) {
				spinner.succeed().start(chalk.bold('Installing dependencies'));
				await new PackageManagerRunner(packageManager).setInstallCommand().setExecaOptions({cwd: projectPath}).build().run();
			} else {
				spinner.info(`Dependency installation skipped, to install run: ${chalk.blue(`${packageManager}`)} install`);
			}

			spinner.succeed(chalk.bold('Done'));
			log(`Your ${extensionType} extension has been added.`);
		});

		logAndAbort(error, {spinner} as logAndAbortOptions);
	}
}
