import {BUILD_DIRNAME, DIRECTUS_EXTENSION_FOLDER_PREFIX} from '@common/constants.js';
import {EXTENSION_PKG_KEY, type ExtensionManifest, type SplitEntrypoint} from '@directus/extensions';
import fse from 'fs-extra';
import path from 'node:path';
import type {PackageJson} from 'pkg-types';
import {getCliVersion} from './get-cli-version.js';

export async function updatePackageManifest(targetPath: string, targetDir: string) {
	const packageJsonPath = path.join(targetPath, 'package.json');
	const packageManifest = await fse.readJson(packageJsonPath);

	const splitEntryPoint = (packageManifest as ExtensionManifest)[EXTENSION_PKG_KEY].path as SplitEntrypoint;

	splitEntryPoint.api = splitEntryPoint.api.replace('dist', `${BUILD_DIRNAME}/${DIRECTUS_EXTENSION_FOLDER_PREFIX}${targetDir}/dist`);
	splitEntryPoint.app = splitEntryPoint.app.replace('dist', `${BUILD_DIRNAME}/${DIRECTUS_EXTENSION_FOLDER_PREFIX}${targetDir}/dist`);

	if ((packageManifest as PackageJson).devDependencies) {
		packageManifest.devDependencies = {...packageManifest.devDependencies, dbxcli: await getCliVersion()};
	}

	await fse.writeJson(packageJsonPath, packageManifest, {spaces: 4});
}
