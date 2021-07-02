const fs = require('fs');

const addTailWind = async (dependencies, devDependencies, packageJson, files) => {

    try {
        const optionPath = 'project/options/mongodb/*';
        fs.access(`${global.homedir}/${optionPath}`, () => {
            files.push(optionPath);
        });
    } catch (err) {
    }

    dependencies.push(
        'autoprefixer',
        'csso',
        'postcss',
        'postcss-cli',
        'postcss-csso',
        'postcss-import',
        'purgecss',
        'tailwindcss',
        '@tailwindcss/typography',
    );

    packageJson.scripts = {
        ...packageJson.scripts,
        'dev:css': 'NODE_ENV=development postcss src/main/css/ --dir src/main/resources/static/css/ --watch',
        'postcss': 'postcss src/main/css/ --dir src/main/resources/static/css/'
    };
}

module.exports = addTailWind;
