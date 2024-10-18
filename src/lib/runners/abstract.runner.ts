import {execa, type Subprocess, type Options as ExecaOptions} from 'execa';

export abstract class AbstractRunner<T> {
    protected execaOptions?: ExecaOptions;
    protected subprocess?: Subprocess;
    constructor (protected _name: string, protected commandAndOptions?: string) { }

    get name(): string {
        return this._name;
    }

    public build(): T {
        const commandAndOptionsList = this.commandAndOptions ? this.commandAndOptions.split(' ') : [''];
        const execaOptions = this.execaOptions
            ? {...this.execaOptions, stdio: ['pipe', 'pipe', 'pipe']}
            : {};
        this.subprocess = execa(this._name, commandAndOptionsList, execaOptions);
        return this as unknown as T;
    }

    public setExecaOptions(options: ExecaOptions): T {
        this.execaOptions = options;
        return this as unknown as T;
    }

    public async run(): Promise<void> {
        if (this.subprocess) {
            await this.subprocess;
        }
    }
}
