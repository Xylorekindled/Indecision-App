const path = require('path');

module.exports = {
    mode: 'production',
    entry: './src/app.js',
    output: {
        path: path.join(__dirname, 'public'),
        filename: 'bundle.js'
    },
    // Loader
    module: {
        rules: [{
            loader: 'babel-loader',
            test: /\.js$/,
            exclude: /node_modules/
        }]
    },

    //Source Map
    devtool: 'cheap-module-eval-source-map',

    devServer: {
        contentBase: path.join(__dirname, 'public')
    }
};


