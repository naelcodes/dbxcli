
export const LOG_LEVEL = {
	INFO: 'INFO',
	//WARN: 'WARN',
	ERROR: 'ERROR',
	//DEBUG: 'DEBUG',
} as const;

export const PACKAGE_MANAGER_EXEC = {
	PNPM: 'pnpx',
	NPM: 'npx',
} as const;

export const PACKAGE_MANAGER = {
	PNPM: 'pnpm',
	NPM: 'npm',
} as const;

export const LOCK_FILE = {
	PNPM:'pnpm-lock.yaml',
	NPM:'package-lock.json'
} as const



export const BUILD_DIRNAME = 'extensions';
export const DIRECTUS_EXTENSION_FOLDER_PREFIX = 'directus-extension-';