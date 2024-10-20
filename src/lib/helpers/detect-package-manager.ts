import {LOCK_FILE, PACKAGE_MANAGER} from '@common/constants.js';
import chalk from 'chalk';
import fse from "fs-extra";

export async function detectPackageManager(targetPath:string):Promise<string>{
    if((await fse.pathExists(`${targetPath}/${LOCK_FILE.PNPM}`))){
        return PACKAGE_MANAGER.PNPM;
    }

    if((await fse.pathExists(`${targetPath}/${LOCK_FILE.NPM}`))){
        return PACKAGE_MANAGER.NPM
    }

    throw(`Couldn't detect the lock file of supported package managers from the current directory. Please run ${chalk.green.bold('pnpm install')} or ${chalk.green.bold('npm install')} and try again`)
}