import type {EnumRecord} from '@common/types.js';

export function toEnumRecord<T extends readonly string[]>(readOnlyArr: T): EnumRecord<T> {
	return readOnlyArr.reduce(
		(acc, curr) => {
			acc[curr.toUpperCase() as Uppercase<T[number]>] = curr.toLowerCase() as Lowercase<Uppercase<T[number]>>;

			return acc;
		},
		{} as const as EnumRecord<T>,
	);
}
