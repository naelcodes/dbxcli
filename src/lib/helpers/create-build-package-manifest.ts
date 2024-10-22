import path from 'node:path';
import fse from 'fs-extra';
import {EXTENSION_PKG_KEY, type ExtensionManifest} from '@directus/extensions';
import type{BuildManifest} from '@common/types.js';

export async function createBuildPackageManifest(targetPath:string,destinationPath:string){
    const packageJsonPath = path.join(targetPath, 'package.json');
	const packageManifest:ExtensionManifest = await fse.readJson(packageJsonPath);

    const extensionBuildPackageManifest:BuildManifest = {
        name:packageManifest.name,
        version:packageManifest.version,
        type:packageManifest.type as string,
        [EXTENSION_PKG_KEY]:packageManifest[EXTENSION_PKG_KEY]
    }

    await fse.outputJson(`${destinationPath}/package.json`,extensionBuildPackageManifest,{spaces:4})

}