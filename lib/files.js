const fs = require('fs');
const run = require('./command');

function replaceInFile(value, replacement, file) {
    return new Promise((resolve, reject) => {
        try {
            const data = fs.readFileSync(file, {encoding: 'utf8'});
            const result = data.replace(value, replacement);
            fs.writeFileSync(file, result);
            resolve();
        } catch(err) {
            reject(err);
        }
    });
}

function copyFiles(files, dest, options) {

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

module.exports = {
    replaceInFile,
    copyFiles,
};
