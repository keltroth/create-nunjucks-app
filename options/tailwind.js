import glob from 'glob';

const moduleName = 'tailwind';

/**
 * Adding `tailwind` module to the generated project.
 * @param {Array<String>} dependencies A array of string containing dependencies
 * @param {Array<String>} devDependencies A array of string containing dev dependencies
 * @param {Object} packageJson An object representing the package.json file of the generated project
 * @param {Array<String>} files A array of string containing all the files (with wildcard) to be added to the generated project
 * @param {String} root A string representing the path to the generated project
 * @returns {undefined}
 */
export default async (dependencies, devDependencies, packageJson, files, root) => {

    const optionPath = `project/options/${moduleName}/*`;
    const matches = glob.sync(`${global.homedir}/${optionPath}`);
    if (matches.length > 0) {
        files.push(optionPath);
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
