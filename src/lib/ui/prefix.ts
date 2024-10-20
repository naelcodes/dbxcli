import {LOG_LEVEL} from '@common/constants.js';
import chalk from 'chalk';

export const  LOG_PREFIX = {
	ERROR: chalk.bgRgb(210, 0, 75).bold.rgb(0, 0, 0)(` ${LOG_LEVEL.ERROR} `),
	INFO: chalk.bgRgb(60, 190, 100).bold.rgb(0, 0, 0)(` ${LOG_LEVEL.INFO}  `)
} as const