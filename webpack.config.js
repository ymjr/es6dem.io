var config = {
    entry: './app/js/index.js'
};

module.exports = (env, argv) => {

    if (argv.mode === 'development') {
        config.devtool = 'source-map';
    }

    if (argv.mode === 'production') {
    }

    return config;
};
