import fs from 'fs/promises';
import run from './command.js';

/**
 * Replace `value` with `replacement` in `file` content then write it back.
 * @param {String} value A string to search for.
 * @param {String} replacement A string containing the text to replace for every successful match of searchValue in this string.
 * @param {String} file A string representing the path of the file
 * @returns {Promise} A promise to handle replacement
 */
export async function replaceInFile(value, replacement, file) {
    const data = await fs.readFile(file, { encoding: 'utf8' });
    const result = data.replace(value, replacement);
    return fs.writeFile(file, result);
}

/**
 * Copy `files` to `dest`.
 * @param {Array<String>} files An array of string containing pathes to the files
 * @param {String} dest A string containing the destination path
 * @param {Object} options An object with two possible options : recursive and verbose
 * @returns {Promise} promise to handle copy
 */
export function copyFiles(files, dest, options) {

    const commandCopy = 'cp';

    let argsCopy = [];

    if (options.recursive) {
        argsCopy.push('-R');
    }
    if (options.verbose) {
        argsCopy.push('-v');
    }

    files = [files].flat();

    for (let i = 0; i < files.length; i++) {
        if (!files[i].startsWith('/')) {
            files[i] = global.homedir + '/' + files[i];
        }
    }

    argsCopy.push(files);
    argsCopy.push(dest);

    argsCopy = argsCopy.flat();
    return run(commandCopy, argsCopy);
}
