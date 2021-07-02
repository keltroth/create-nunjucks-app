import glob from 'glob';
import {replaceInFile} from '../lib/files.js';

const moduleName = 'mariadb';

/**
 * Adding `mariadb` module to the generated project.
 * @param {Array<String>} dependencies A array of string containing dependencies
 * @param {Array<String>} devDependencies A array of string containing dev dependencies
 * @param {Object} packageJson An object representing the package.json file of the generated project
 * @param {Array<String>} files A array of string containing all the files (with wildcard) to be added to the generated project
 * @param {String} root A string representing the path to the generated project
 * @returns {undefined}
 */
export default async (dependencies, devDependencies, packageJson, files, root) => {

    const optionPath = `project/options/${moduleName}/*`;
    const matches = glob.sync(`${global.homedir}/${optionPath}`);
    if (matches.length > 0) {
        files.push(optionPath);
    }

    dependencies.push('mariadb');

    const configMariaDB =
        `const {
    MARIADB_USERNAME,
    MARIADB_PASSWORD,
    MARIADB_ROOT_PASSWORD,
    MARIADB_HOSTNAME,
    MARIADB_PORT,
    MARIADB_DB,
} = process.env;

global.config.db = {
    username: MARIADB_USERNAME,
    password: MARIADB_PASSWORD,
    rootpassword: MARIADB_ROOT_PASSWORD,
    hostname: MARIADB_HOSTNAME,
    port: MARIADB_PORT,
    name: MARIADB_DB,
};`
    try {
        await replaceInFile('// DATABASE_CONFIG', configMariaDB, root + '/config.js');
    } catch (err) {
        console.log({err});
    }
}
