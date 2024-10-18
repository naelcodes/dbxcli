import type {Ora} from 'ora';
import type {LOG_LEVEL} from './constants.js';

export type LOG_LEVEL_TYPE = (typeof LOG_LEVEL)[keyof typeof LOG_LEVEL];

export type logAndAbortOptions = {
	spinner?: Ora;
	context?: string;
	loglevel: LOG_LEVEL_TYPE;
};

export type Result<T, E extends Error = Error> = [T | null, E | null];
export type AsyncResult<T, E extends Error = Error> = Promise<Result<T, E>>;

export type CommandInput = {
	name: string;
	value: boolean | string;
};

export type DirectusCliPromptsAnswers = {
	extensionType?: string;
	extensionName?: string;
	language?: string;
	path?: string;
	install?: 'y' | 'n';
};

export type EnumRecord<T extends readonly string[]> = {
	[K in Uppercase<T[number]>]: Lowercase<K>;
};
