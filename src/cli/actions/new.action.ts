import type {CommandInput, DirectusCliPromptsAnswers, logAndAbortOptions} from '@common/types.js';
import {AbstractAction} from './abstract.action.js';
import {resolve} from 'node:path';
import {AsyncResultWrap, log, logAndAbort, toEnumRecord} from '@lib/utils';
import ora from 'ora';
import {EXTENSION_TYPES} from '@directus/extensions';
import {DirectusRunner, GitRunner, PackageManagerRunner} from '@lib/runners';
import chalk from 'chalk';
import fse from 'fs-extra';
import {createBuildPackageManifest, createDirectories, getDoneMessage, getTemplatePath, updateBuildDirPathInProjectPackageManifest} from '@lib/helpers';
import {BUILD_DIRNAME, DIRECTUS_EXTENSION_FOLDER_PREFIX} from '@common/constants.js';

export default class NewAction extends AbstractAction {
	async handle(inputs?: CommandInput[], options?: CommandInput[]): Promise<void> {
		const spinner = ora();
		let getDoneMsg = '';
		const extensionType = toEnumRecord(EXTENSION_TYPES).BUNDLE;

		const [, error] = await AsyncResultWrap(async () => {
			const packageManagerName = options?.find((option) => option.name === 'packageManager')?.value as string;

			const targetDir = inputs?.find((input) => input.name === 'name')?.value as string;

			const targetPath = resolve(targetDir);

			if (/.*(?:\\|\/).*/.test(targetDir)) {
				throw "Directory name can't be a path";
			}

			const packageManagerRunner = new PackageManagerRunner(packageManagerName.toLowerCase());

			const promptAnswers: DirectusCliPromptsAnswers = {
				extensionName: targetDir,
				extensionType,
				install: 'n',
			};

			spinner.start(chalk.bold('scaffolding directus bundle extension'));

			await new DirectusRunner().setRunnerName(packageManagerRunner.ExecCommand).setCreateCommand().setPromptAnswers(promptAnswers).build().run();

			spinner.succeed().start(chalk.bold('creating extension build directory'));

			await createDirectories(targetPath, `${BUILD_DIRNAME}/${DIRECTUS_EXTENSION_FOLDER_PREFIX}${targetDir}`);

			await createBuildPackageManifest(targetPath,`${targetPath}/${BUILD_DIRNAME}/${DIRECTUS_EXTENSION_FOLDER_PREFIX}${targetDir}`);

			spinner.succeed().start(chalk.bold('updating package manifest'));
			await updateBuildDirPathInProjectPackageManifest(targetPath, targetDir);

			spinner.succeed().start(chalk.bold('copying templates files'));
			await fse.copy(getTemplatePath(), targetPath, {overwrite: false});

			

			const gitInit = options?.find((option) => option.name === 'gitInit')?.value as boolean;

			if (gitInit) {
				spinner.succeed().start('Initializing git repository');
				await new GitRunner('init').setExecaOptions({cwd: targetPath}).build().run();
			} else {
				spinner.succeed().start('skip git repository initialization');
			}

			const install = options?.find((option) => option.name === 'install')?.value as boolean;

			if (install) {
				spinner.succeed().start(chalk.bold('Installing dependencies'));
				await packageManagerRunner.setInstallCommand().setExecaOptions({cwd: targetPath}).build().run();
			} else {
				spinner.succeed().start(chalk.bold('skip dependency installation'));
			}

			getDoneMsg = getDoneMessage(extensionType, targetDir, targetPath, packageManagerRunner.name, install);

			spinner.succeed();
		});

		logAndAbort(error, {spinner} as logAndAbortOptions);
		log(getDoneMsg);
	}
}
