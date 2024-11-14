import type {Ora} from 'ora';
import type {LOG_LEVEL} from './constants.js';
import type {EXTENSION_PKG_KEY, ExtensionOptions, ExtensionType} from '@directus/extensions';
import type {Subprocess} from 'execa';

export type LOG_LEVEL_TYPE = (typeof LOG_LEVEL)[keyof typeof LOG_LEVEL];
export type logAndAbortOptions = {
	spinner?: Ora;
	context?: string;
	loglevel: LOG_LEVEL_TYPE;
};

export type Result<T, E extends Error = Error> = [T | null, E | null];
export type AsyncResult<T, E extends Error = Error> = Promise<Result<T, E>>;
export type EnumRecord<T extends readonly string[]> = {
	[K in Uppercase<T[number]>]: Lowercase<K>;
};

export type CommandInput = {
	name: string;
	value: boolean | string;
};

export type BuildManifest = {
	name: string;
	version: string;
	type: string;
	[EXTENSION_PKG_KEY]: ExtensionOptions;
};

export type UseState<T> = [() => T, (newValue: Partial<T> | ((prevState: T) => Partial<T>)) => void];

export type Prompt= {
	name: string;
	state: PromptState;
};

export type PromptAction = {
	name: string;
	action: (data: string, subprocess: Subprocess, useState: UseState<PromptState>) => Promise<void>;
};


export type PromptState = {
	answer: string | undefined;
	isExtensionNameSet?: boolean;
	promptStartLine?: string;
	seenChoices?: Set<string>;
	currentChoice?: string | undefined;
};

export type DirectusCliPromptsAnswers = {
	extensionType?: ExtensionType;
	extensionName?: string;
	bundleEntryName?:string;
	language?: string;
	path?: string;
	install?: 'y' | 'n';
};

