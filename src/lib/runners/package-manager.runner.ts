import {PACKAGE_MANAGER, PACKAGE_MANAGER_EXEC} from '@common/constants.js';
import {AbstractRunner} from './abstract.runner.js';
import chalk from 'chalk';

export class PackageManagerRunner extends AbstractRunner<PackageManagerRunner> {
	private execCommand?: string;
	constructor(name: string) {
		if (!(Object.values(PACKAGE_MANAGER) as unknown as string[]).includes(name)) {
			throw `Package manager ${chalk.red(name)} is not managed. The following package managers are managed : ${chalk.green(Object.values(PACKAGE_MANAGER).join(',').toLowerCase())}`;
		}
		super(name);
		this.execCommand = PACKAGE_MANAGER_EXEC[name.toUpperCase() as keyof typeof PACKAGE_MANAGER];
	}

	setInstallCommand(): PackageManagerRunner {
		this.commandAndOptions = 'install';
		return this;
	}

	get ExecCommand(): string {
		return this.execCommand as string;
	}

	setExecCommand(): PackageManagerRunner {
		this.commandAndOptions = this.execCommand;
		return this;
	}
}
