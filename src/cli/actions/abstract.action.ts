import type {CommandInput} from '@common/types.js';

export abstract class AbstractAction {
	abstract handle(inputs?: CommandInput[], options?: CommandInput[]): Promise<void>;
}
