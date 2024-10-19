import type {logAndAbortOptions, Result} from '@common/types.js';
import {AsyncResultWrap, logAndAbort} from '@lib/utils';
import {dirname, resolve} from 'node:path';
import {fileURLToPath} from 'node:url';
import type {PackageJson} from 'pkg-types';
import fse from 'fs-extra';

export async function getCliVersion(): Promise<string> {
	const [version, error]: Result<string, Error> = await AsyncResultWrap(async () => {
		const packageJson: PackageJson = await fse.readJson(resolve(dirname(fileURLToPath(import.meta.url)), '..', '..', '..', 'package.json'));

		if (!packageJson?.version) {
			throw 'could not get the version from package.json file';
		}
		return packageJson.version;
	});

	logAndAbort(error, {context: 'an error occured when getting the cli version'} as logAndAbortOptions);

	return version as string;
}
