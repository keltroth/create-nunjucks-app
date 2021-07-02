const {replaceInFile} = require('../files');
const fs = require('fs');

const addMariaDB = async (dependencies, devDependencies, packageJson, files, root) => {

    try {
        const optionPath = 'project/options/mongodb/*';
        fs.access(`${global.homedir}/${optionPath}`, () => {
            files.push(optionPath);
        });
    } catch (err) {
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

module.exports = addMariaDB;
