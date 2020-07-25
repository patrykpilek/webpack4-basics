const path = require("path");
const webpack = require("webpack");

module.exports = {
    entry: {
        main: [
            "@babel/polyfill",
            "./src/main.js"
        ]
    },
    mode: "development",
    output: {
        filename: "[name]-bundle.js",
        path: path.resolve(__dirname, "../dist"),
        publicPath: "/"
    },
    devServer: {
        contentBase: "dist",
        overlay: true,
        hot: true,
        stats: {
            colors: true
        }
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: [
                    {
                        loader: "babel-loader",
                        options: {
                            presets: ['@babel/preset-env']
                        }
                    }
                ]
            },
            {
                test: /\.css$/,
                use: [
                    {
                        loader: "style-loader"
                    },
                    {
                        loader: "css-loader"
                    }
                ]
            },
            {
                test: /\.html$/,
                use: [
                    {
                        loader: "file-loader",
                        options: {
                            name: "[name].[ext]"
                        }
                    },
                    {
                        loader: "extract-loader",
                        options: {
                            publicPath: "../"
                        }
                    },
                    {
                        loader: "html-loader",
                        options: {
                            attributes: {
                                list: [
                                    {
                                        tag: 'img',
                                        attribute: 'src',
                                        type: 'src',
                                    }
                                ],
                            }
                        }
                    }
                ]
            },
            {
                test: /\.(jpg|gif|png)$/,
                use: [
                    {
                        loader: "file-loader",
                        options: {
                            name: "images/[name].[ext]"
                        }
                    }
                ]
            },
        ]
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin()
    ]
}