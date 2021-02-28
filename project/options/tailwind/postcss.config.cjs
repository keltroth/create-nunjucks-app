const isDev = process.env.NODE_ENV === 'development';
const postimport = require('postcss-import');
const autoprefixer = require('autoprefixer');
const csso = require('postcss-csso')({
    comments: false,
});

const tailwindconfig = require('./tailwind.config.cjs');

tailwindconfig.purge = {
    enabled: !isDev,
    content: ['src/main/resources/templates/**/*.njk'],
};

// eslint-disable-next-line import/order
const tailwind = require('tailwindcss')({
    config: tailwindconfig,
});

let plugins = [postimport, tailwind];

if (!isDev) {
    plugins = [...plugins, autoprefixer, csso];
}

module.exports = { plugins };
