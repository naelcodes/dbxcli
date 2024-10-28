import fse from 'fs-extra';
import {join,basename} from 'node:path';
import {EXTENSION_PKG_KEY, type ExtensionManifest, type BundleExtension, type SplitEntrypoint} from '@directus/extensions';
import {BUILD_DIRNAME, DIRECTUS_EXTENSION_FOLDER_PREFIX} from '@common/constants.js';
import type {BuildManifest} from '@common/types.js';
import type {PackageJson} from 'pkg-types';
import {getCliVersion} from './get-cli-version.js';




export async function createBuildPackageManifest(targetPath:string,destinationPath:string){
    const packageJsonPath = join(targetPath, 'package.json');
	const packageManifest:ExtensionManifest = await fse.readJson(packageJsonPath);

    const extensionBuildPackageManifest:BuildManifest = {
        name:packageManifest.name,
        version:packageManifest.version,
        type:packageManifest.type as string,
        [EXTENSION_PKG_KEY]:packageManifest[EXTENSION_PKG_KEY]
    }

    await fse.outputJson(`${destinationPath}/package.json`,extensionBuildPackageManifest,{spaces:4})

}

export async function updateBundleExtensionEntriesInBuildPackageManifest(targetPath: string) {
	const buildPackageManifestPath = join(
		`${targetPath}/${BUILD_DIRNAME}/${DIRECTUS_EXTENSION_FOLDER_PREFIX}${basename(targetPath)}`,
		'package.json',
	);

	const projectPackageManifest: ExtensionManifest = await fse.readJson(join(targetPath, 'package.json'));
    const buildPackageManifest: BuildManifest= await fse.readJson(buildPackageManifestPath);

    (buildPackageManifest[EXTENSION_PKG_KEY] as unknown as BundleExtension).entries = (projectPackageManifest[EXTENSION_PKG_KEY] as unknown as BundleExtension).entries;

    await fse.writeJson(buildPackageManifestPath,buildPackageManifest,{spaces:4})
    
}

export async function updateBuildDirPathInProjectPackageManifest(targetPath: string, targetDir: string) {
	const packageJsonPath = join(targetPath, 'package.json');
	const packageManifest = await fse.readJson(packageJsonPath);

	const splitEntryPoint = (packageManifest as ExtensionManifest)[EXTENSION_PKG_KEY].path as SplitEntrypoint;

	splitEntryPoint.api = splitEntryPoint.api.replace('dist', `${BUILD_DIRNAME}/${DIRECTUS_EXTENSION_FOLDER_PREFIX}${targetDir}/dist`);
	splitEntryPoint.app = splitEntryPoint.app.replace('dist', `${BUILD_DIRNAME}/${DIRECTUS_EXTENSION_FOLDER_PREFIX}${targetDir}/dist`);

	if ((packageManifest as PackageJson).devDependencies) {
		packageManifest.devDependencies = {...packageManifest.devDependencies, dbxcli: await getCliVersion()};
	}

	await fse.writeJson(packageJsonPath, packageManifest, {spaces: 4});
}
