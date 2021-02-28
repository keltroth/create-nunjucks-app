const fs = require('fs');

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

module.exports = replaceInFile;
