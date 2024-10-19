import {LOG_LEVEL} from '@common/constants.js';
import type {LOG_LEVEL_TYPE, logAndAbortOptions} from '@common/types.js';
import chalk from 'chalk';
import {ExecaError} from 'execa';

const _log = console.log;

export function log(message: string, type?: LOG_LEVEL_TYPE) {
	switch (type) {
		case LOG_LEVEL.INFO:
			_log(`${chalk.bgRgb(60, 190, 100).bold.rgb(0, 0, 0)(` ${LOG_LEVEL.INFO}   `)} ${message}`);
			break;
		case LOG_LEVEL.ERROR:
			_log(`${chalk.bgRgb(210, 0, 75).bold.rgb(0, 0, 0)(` ${LOG_LEVEL.ERROR} `)} ${message}`);
			break;
		default:
			_log(message);
	}
}

export function logAndAbort(error: unknown, options?: logAndAbortOptions) {
	if (error) {
		let _loglevel: LOG_LEVEL_TYPE = LOG_LEVEL.ERROR;

		if (options) {
			const {loglevel, context, spinner} = options;

			if (spinner) {
				spinner.fail();
			}

			if (loglevel) {
				_loglevel = loglevel;
			}

			if (context) {
				log(context, _loglevel);
			}
		}

		if (error instanceof ExecaError) {
			let message = '';

			if (error.shortMessage) {
				log(`${error.shortMessage}.`, _loglevel);
			}

			if (error.cause) {
				message += `${error.cause as string}.`;
			} else if (error.stderr) {
				const stderrOutput = error.stderr as string;
				message += `${stderrOutput.includes('[Error]') ? stderrOutput.replace('[Error] ', '') : stderrOutput}`;
			}
			log(message, _loglevel);
		} else {
			log(error as string, _loglevel);
		}
		process.exit(1);
	}
}
