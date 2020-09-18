const path = require("path");
// const HtmlWebpackPlugin = require('html-webpack-plugin');
// const {CleanWebpackPlugin} = require('clean-webpack-plugin');

module.exports = {
    mode: "development",
    devtool: "eval-source-map",
    entry: "./src/index.js",
    output: {
        // publicPath: '/xvr/ui/admin',
        filename: "index.js",
        path: path.resolve(__dirname, "build/resources/main/static/js")
    },
    plugins: [
        // new CleanWebpackPlugin(),
        // new HtmlWebpackPlugin({
        //     template: './xvr/admin/src/assets/index.html'
        // })
    ],
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader"
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