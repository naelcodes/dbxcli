import type{Command} from 'commander';
import type{AbstractAction} from '../actions/abstract.action.js';

export abstract class AbstractCommand {
    constructor (protected action: AbstractAction) { }
    abstract load(program: Command): void;
}
