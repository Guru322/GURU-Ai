import {fileURLToPath} from 'node:url';
import path from 'node:path';
import execa from 'execa';

const dirname = path.dirname(fileURLToPath(import.meta.url));

const improveError = error => {
	if (error.exitCode === 2) {
		error.message = 'Couldn\'t find the app';
	}

	return error;
};

export default async function appPath(appName) {
	if (process.platform !== 'darwin') {
		throw new Error('macOS only');
	}

	if (typeof appName !== 'string') {
		throw new TypeError('Please supply an app name or bundle identifier');
	}

	try {
		const {stdout} = await execa('./main', [appName], {cwd: dirname});
		return stdout;
	} catch (error) {
		throw improveError(error);
	}
}

appPath.sync = appName => {
	if (process.platform !== 'darwin') {
		throw new Error('macOS only');
	}

	if (typeof appName !== 'string') {
		throw new TypeError('Please supply an app name or bundle identifier');
	}

	try {
		return execa.sync('./main', [appName], {cwd: dirname}).stdout;
	} catch (error) {
		throw improveError(error);
	}
};
