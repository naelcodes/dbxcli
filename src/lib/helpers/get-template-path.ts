import {dirname, resolve} from 'node:path';
import {fileURLToPath} from 'node:url';

export function getTemplatePath(): string {
	return resolve(dirname(fileURLToPath(import.meta.url)), '..', '..', '..', 'templates');
}
