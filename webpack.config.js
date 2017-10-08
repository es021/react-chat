const webpack = require('webpack');

var isProd = false;
if (process.env.NODE_ENV === "production") {
    isProd = true;
}else if (process.env.NODE_ENV === "development") {
    isProd = false;
}

var entry;
if (isProd) {
    entry = ['./src/index.js'];
} else {
    entry = [
        'webpack-dev-server/client?http://localhost:8080',
        'webpack/hot/only-dev-server',
        './src/index.js'
    ];
}

module.exports = {
    entry: entry,
    plugins: [
        new webpack.DefinePlugin({
            'process.env': {
                // 'NODE_ENV': JSON.stringify((isProd) ? 'production' : 'development')
                'NODE_ENV': JSON.stringify((process.env.NODE_ENV))
            }
        })
    ],
    module: {
        loaders: [
            {test: /\.jsx?$/,
                exclude: /node_modules/,
                loader: (isProd) ? 'babel-loader' : 'react-hot-loader!babel-loader'
            },
            {test: /\.css$/, loader: "style-loader!css-loader"},
            {test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/, loader: "url-loader?limit=10000&mimetype=application/font-woff"},
            {test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/, loader: "file-loader"}
        ]
    },
    resolve: {
        extensions: ['*', '.js', '.jsx']
    },
    output: {
        path: __dirname + '/dist',
        publicPath: '/chat/',
        filename: 'bundle.js'
    },
    devServer: {
        contentBase: './dist',
        hot: true
    }
};
