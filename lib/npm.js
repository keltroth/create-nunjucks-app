import run from './command.js';
import { readFile } from 'fs/promises';

/**
 * Run NPM install command.
 * @param {String} root A string containing destination root path
 * @param {Array<String>} dependencies A array of string containing project's dependencies (or dev)
 * @param {Object} options An object with two possible options : devDependencies and verbose
 * @returns {Promise} A promise to handle installation
 */
export function install(root, dependencies, options) {
    process.chdir(root);
    const command = 'npm';
    let args = [
        'install',
        '--loglevel',
        'error',
    ];

    if (options.verbose) {
        args.push('--verbose');
    }

    if (options.devDependencies) {
        args.push('--save-dev');
    } else {
        args.push('--save');
    }

    args.push(dependencies);

    args = args.flat();
    return run(command, args);
}

/**
 * Loads this project's package.json file.
 * @returns {Promise<String>} A promise which resolve to JSON parsed String
 */
export async function loadPackage() {
    return JSON.parse(await readFile(`${global.homedir}/package.json`, { encoding: 'utf-8' }));
}

