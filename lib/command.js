import spawn from 'cross-spawn';

/**
 * Runs a host command with spawn.
 * @param {String} command command to run
 * @param {Array<String>} args parameters given to the command
 * @returns {Promise} command handler
 */
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

export default run;
