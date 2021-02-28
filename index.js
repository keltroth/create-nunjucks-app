#!/usr/bin/env node
const {Command} = require('commander');
const chalk = require('chalk');
const envinfo = require('envinfo');
const path = require('path');
const fs = require('fs-extra');
const os = require('os');

const addMongoDB = require('./lib/options/mongodb');
const addTailWind = require('./lib/options/tailwind');
const {copyFiles} = require('./lib/files');
const {install} = require('./lib/npm');

(async () => {
    global.homedir = module.path;

    let projectName = '';

    const packageJson = require('./package.json');

    const destPackageJson = {
        version: '0.0.1',
        author: 'Nobody',
        type: 'module',
        description: 'A new NodeJS+Express+Nunjucks Project',
        scripts: {
            'start': 'cross-env APP_ENV=development PORT=4000 npm-run-all --parallel dev:*',
            'dev:run': 'nodemon server',
            'dev:serve': 'browser-sync start --proxy http://localhost:${PORT} --files src/main/resources/',
        },
    };

    let dependencies = [
        'body-parser',
        'cookie-parser',
        'cors',
        'express',
        'express-nunjucks',
        'express-session',
        'morgan',
        'nconf',
        'nunjucks',
        'serve-favicon',
        'winston',
    ];

    let devDependencies = [
        'browser-sync',
        'cross-env',
        'eslint',
        'eslint-config-airbnb-base',
        'eslint-plugin-import',
        'nodemon',
        'npm-run-all',
    ];

    let files = ['project/base/*', 'project/base/.npmrc', 'project/base/.eslint*'];

    const program = new Command(packageJson.name)
        .version(packageJson.version)
        .arguments('<project-directory>')
        .version(packageJson.version)
        .action(name => {
            projectName = name;
            destPackageJson.name = name;
        })
        .usage(`${chalk.green('<project-directory>')} [options]`)
        .option('--verbose', 'print additional logs')
        .option('--info', 'print environment debug info')
        .option('--tailwind', 'adds tailwind')
        .option('--database <database>', 'adds a database value : mongodb or mariadb')
        .option('--author <author>', 'author name')
        .parse(process.argv);


    const options = program.opts();

    if (options.author) {
        destPackageJson.author = options.author;
    }

    if (options.info || program.info) {
        console.log(chalk.bold(`\n  Environment Info:`));
        console.log(`\n  current version of ${packageJson.name}: ${packageJson.version}`);
        console.log(`  running from: ${__dirname}`);
        console.log(`  destination: ${__dirname}/${projectName}`);
        const infos = await envinfo
            .run(
                {
                    System: ['OS', 'CPU'],
                    Binaries: ['Node', 'npm', 'Yarn'],
                },
                {
                    duplicates: true,
                    showNotFound: true,
                }
            );

        console.log(infos);

        process.exit(0);
    }

    let step = 0;

    options.verbose && console.log(chalk.bold(`${step++}. Creating directories`));
    const root = path.resolve(projectName);
    const appName = path.basename(root);
    fs.ensureDirSync(projectName);

    try {
        options.verbose && console.log(chalk.bold(`${step++}. Copying files (index.js, logger.js, ...)`));
        await copyFiles(files, root, {recursive: true, verbose: options.verbose});
    } catch (err) {
        console.log({err});
    }

    files = [];

    options.verbose && console.log(chalk.bold(`${step++}. Managing options (Tailwind, MongoDB, MariaDB, ...)`));
    if (options.database === 'mariadb') {
    }

    if (options.database === 'mongodb') {
        await addMongoDB(dependencies, devDependencies, destPackageJson, files, root);
    }

    if (options.tailwind) {
        await addTailWind(dependencies, devDependencies, destPackageJson, files, root);
    }

    try {
        options.verbose && console.log(chalk.bold(`${step++}. Copying options files`));
        await copyFiles(files, root, {recursive: true, verbose: options.verbose});
    } catch (err) {
        console.log({err});
    }

    options.verbose && console.log(chalk.bold(`${step++}. Generating package.json`));
    fs.writeFileSync(path.join(root, 'package.json'), JSON.stringify(destPackageJson, null, 2) + os.EOL);

    try {
        options.verbose && console.log(chalk.bold(`${step++}. Launching npm install`));
        await install(root, dependencies, {verbose: options.verbose});
        await install(root, devDependencies, {verbose: options.verbose, devDependencies: true});
    } catch (err) {
        console.log({err});
    }

})();

