const path = require("path");
const webpack = require("webpack");
// const HtmlWebpackPlugin = require('html-webpack-plugin');
// const {CleanWebpackPlugin} = require('clean-webpack-plugin');

module.exports = {
    devServer: {
        port: 8081,
        contentBase: path.resolve(__dirname, "./src/main/resources/public/"),
        proxy: {
            '/**' : {
                target: 'http://localhost:8080',
                secure: false,
                prependPath: false
            }
        },
        historyApiFallback: true,
        allowedHosts: [
            'http://localhost:8080'
        ],
        hot: true,
        inline: true,
        watchContentBase: true
    },
    mode: "development",
    devtool: "eval-source-map",
    entry: "./src/index.js",
    output: {
        path: __dirname,
        publicPath: "/build/resources/main/static/js/",
        filename: "./build/resources/main/static/js/index.js"
    },
    plugins: [
        // new CleanWebpackPlugin(),
        // new HtmlWebpackPlugin({
        //     template: './xvr/admin/src/assets/index.html'
        // })
        new webpack.HotModuleReplacementPlugin({
            // Options...
        })
    ],
    module: {
        rules: [
            {
                test: /\.m?js$/,
                exclude: [
                    /node_modules/,
                    /node_modules[\\]/,
                    /node_modules[\\/]core-js/,
                    /node_modules[\\/]webpack[\\/]buildin/,
                    /node_modules[\\/]webpack/,
                ],
                use: {
                    loader: "babel-loader",
                    options: {
                        presets: [
                            ['@babel/preset-env', { targets: "defaults" }]
                        ],
                        plugins: ['@babel/plugin-proposal-class-properties']
                    }
                }
            }
            // {
            //     test: /\.css$/,
            //     use: ["style-loader", "css-loader"]
            // },
            // {
            //     test: /\.handlebars$/,
            //     loader: "handlebars-loader",
            //     query: {
            //         partialDirs: [
            //             path.resolve(__dirname, "xvr/web/js/handlebars")
            //         ],
            //
            //         helperDirs: [
            //             path.resolve(__dirname, "xvr/web/js/handlebars")
            //         ]
            //     }
            // },
            // {
            //     test: /\.(png|svg|jpg|gif)$/,
            //     use: [
            //         'file-loader',
            //     ],
            // },
            // {
            //     test: /\.html$/i,
            //     loader: 'html-loader',
            // }
        ]
    }
};