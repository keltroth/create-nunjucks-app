const {replaceInFile} = require('../files');
const fs = require('fs');

const addMongoDB = async (dependencies, devDependencies, packageJson, files, root) => {
    try {
        const optionPath = 'project/options/mongodb/*';
        fs.access(`${global.homedir}/${optionPath}`, () => {
            files.push(optionPath);
        });
    } catch (err) {
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

module.exports = addMongoDB;
