import glob from 'glob';
import { replaceInFile } from '../lib/files.js';

const moduleName = 'mongodb';

/**
 * Adding `mongodb` module to the generated project.
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

    dependencies.push('mongodb');

    const configMongoDB =
        `const {
    MONGO_USERNAME,
    MONGO_PASSWORD,
    MONGO_HOSTNAME,
    MONGO_PORT,
    MONGO_DB,
    MONGO_COLLECTION,
} = process.env;

global.config.db = {
    username: MONGO_USERNAME,
    password: MONGO_PASSWORD,
    hostname: MONGO_HOSTNAME,
    port: MONGO_PORT,
    name: MONGO_DB,
    collection: MONGO_COLLECTION,
};`
    try {
        await replaceInFile('// DATABASE_CONFIG', configMongoDB, root + '/config.js');
    } catch (err) {
        console.log({err});
    }

}
