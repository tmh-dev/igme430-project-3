const path = require('path');
const HtmlWebPackPlugin = require('html-webpack-plugin');

module.exports = {
    entry: path.join(__dirname, 'src', 'index.tsx'),
    output: {
        path: path.join(__dirname, 'dist'),
        filename: 'bundle.js',
        publicPath: '/'
    },
    devtool: "source-map",
    resolve: {
        extensions: [".ts", ".tsx", ".js", ".json"]
    },
    module: {
        rules: [
            {
                test: /\.tsx?$/, 
                loader: "awesome-typescript-loader",
                exclude: /node_modules/
            },
            {
                enforce: "pre", 
                test: /\.js$/, 
                loader: "source-map-loader",
            },
            {
                test: /\.html$/,
                use: [
                    {
                        loader: "html-loader"
                    }
                ]
            },
            {
                test: /\.scss$/,
                use: [
                    'style-loader',
                    'css-loader',
                    'sass-loader'
                ]
            },
            {
                test: /\.css$/,
                use: [
                    'style-loader',
                    'css-loader'
                ]
            }
        ]
    },
    devServer: {
        historyApiFallback: true,
        proxy: {
            "/api": "https://localhost:8080"
        }
    },
    plugins: [
        new HtmlWebPackPlugin({
            template: path.join(__dirname, 'public', 'index.html')
        })
    ]
};