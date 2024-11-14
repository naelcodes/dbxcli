
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

export const ESCAPE_SEQUENCE = {
	ARROW_DOWN_KEY: '\x1B[B',
	ENTER_KEY: '\n',
} as const;
export const ANSI_REGEX = /((\u001b\[.*?m)|(\x1B\[[0-9;?]*[a-zA-Z]))/g;

export const DIRECTUS_CLI_PROMPTS = {
	EXTENSION_TYPE_PROMPT: 'Choose the extension type',
	BUNDLE_ENTRY_NAME_PROMPT: 'Choose a name for the entry',
	EXTENSION_NAME_PROMPT: 'Choose a name for the extension',
	PROGRAMMING_LANGUAGE_PROMPT: 'Choose the language to use',
	EXTENSION_SRC_PATH_PROMPT: 'Specify the path to the extension source',
	AUTO_INSTALL_DEPENDENCY_PROMPT: 'Auto install dependencies?',
} as const;