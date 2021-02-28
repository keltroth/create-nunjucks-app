const {replaceInFile} = require('../files');

const addMongoDB = async (dependencies, devDependencies, packageJson, files, root) => {
    dependencies.push('mongodb');
    files.push('project/options/mongodb/*');

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