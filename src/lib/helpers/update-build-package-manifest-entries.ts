import {join,basename} from 'node:path';
import fse from 'fs-extra';
import {EXTENSION_PKG_KEY, type ExtensionManifest, type BundleExtension} from '@directus/extensions';
import {BUILD_DIRNAME, DIRECTUS_EXTENSION_FOLDER_PREFIX} from '@common/constants.js';
import type {BuildManifest} from '@common/types.js';

export async function updateBuildPackageManifestEntries(targetPath: string) {
	const buildPackageManifestPath = join(
		`${targetPath}/${BUILD_DIRNAME}/${DIRECTUS_EXTENSION_FOLDER_PREFIX}${basename(targetPath)}`,
		'package.json',
	);

	const projectPackageManifest: ExtensionManifest = await fse.readJson(join(targetPath, 'package.json'));
    const buildPackageManifest: BuildManifest= await fse.readJson(buildPackageManifestPath);

    (buildPackageManifest[EXTENSION_PKG_KEY] as unknown as BundleExtension).entries = (projectPackageManifest[EXTENSION_PKG_KEY] as unknown as BundleExtension).entries;

    await fse.writeJson(buildPackageManifestPath,buildPackageManifest,{spaces:4})
    
}
