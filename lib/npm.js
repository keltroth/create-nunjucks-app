const run = require('./command');

function install(root, dependencies, options) {
    process.chdir(root);
    const command = 'npm';
    let args = [
        'install',
        '--loglevel',
        'error',
    ];

    if (options.verbose) {
        args.push('--verbose');
    }

    if (options.devDependencies) {
        args.push('--save-dev');
    } else {
        args.push('--save');
    }

    args.push(dependencies);

    args = args.flat();
    return run(command, args);
}

module.exports = {
    install
};
