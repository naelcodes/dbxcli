import fse from 'fs-extra';

export async function createDirectories(targetPath: string, ...directories: string[]) {
	for (const directory of directories) {
		await fse.ensureDir(`${targetPath}/${directory}`);
	}
}
