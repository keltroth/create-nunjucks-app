const spawn = require('cross-spawn');

const run = (command, args) => {
    return new Promise((resolve, reject) => {
        const child = spawn(command, args, {stdio: 'inherit', shell: true});
        child.on('close', code => {
            if (code !== 0) {
                reject({
                    command: `${command} ${args.join(' ')}`,
                    currentDirectory: global.homedir
                });
                return;
            }
            resolve();
        });
    });
}

module.exports = run;
