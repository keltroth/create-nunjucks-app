const addTailWind = async (dependencies, devDependencies, packageJson, files, root) => {

    files.push('project/options/tailwind/*');

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
