import {AbstractRunner} from './abstract.runner.js';

export class GitRunner extends AbstractRunner<GitRunner> {
	constructor(commandAndOptions: string) {
		super('git', commandAndOptions);
	}
}
