import type {AsyncResult, Result} from '@common/types.js';

export function ResultWrap<T, E extends Error = Error>(result: () => T): Result<T, E> {
	try {
		return [result(), null];
	} catch (error: unknown) {
		return [null, error as E];
	}
}

export async function AsyncResultWrap<T, E extends Error = Error>(result: () => Promise<T>): AsyncResult<T, E> {
	try {
		return [await result(), null];
	} catch (error: unknown) {
		return [null, error as E];
	}
}
