const path = require("path");
// const TerserPlugin = require("terser-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
    entry: {
        "hello-world": "./src/hello-world.js",
        kiwi: "./src/kiwi.js",
    },
    output: {
        filename: "[name].[contenthash].js",
        path: path.resolve(__dirname, "./dist"),
        publicPath: "",
    },
    mode: "development",
    optimization: {
        splitChunks: {
            chunks: "all",
            minSize: 3000,
        },
    },
    module: {
        rules: [
            {
                test: /\.(ttf)$/,
                type: "asset/resource",
            },
            {
                test: /\.(png|jpg)$/,
                type: "asset",
                parser: {
                    dataUrlCondition: {
                        maxSize: 3 * 1024, // 3kB
                    },
                },
            },
            {
                test: /\.txt/,
                type: "asset/source",
            },
            {
                test: /\.css$/,
                use: [MiniCssExtractPlugin.loader, "css-loader"],
            },
            {
                test: /\.scss$/,
                use: [MiniCssExtractPlugin.loader, "css-loader", "sass-loader"],
            },
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader",
                    options: {
                        presets: ["@babel/env"],
                        plugins: ["@babel/plugin-proposal-class-properties"],
                    },
                },
            },
            {
                test: /\.hbs$/,
                use: ["handlebars-loader"],
            },
        ],
    },
    plugins: [
        // new TerserPlugin(),
        new MiniCssExtractPlugin({
            filename: "[name].[contenthash].css",
        }),
        new CleanWebpackPlugin(),
        new HtmlWebpackPlugin({
            filename: "hello-world.html",
            title: "Hello world",
            chunks: ["hello-world"],
            description: "Hello world",
            template: "src/page-template.hbs",
            minify: false,
            // meta: {
            //     description: "Some description",
            // },
        }),
        new HtmlWebpackPlugin({
            filename: "kiwi.html",
            title: "Kiwi",
            chunks: ["kiwi"],
            description: "Kiwi",
            template: "src/page-template.hbs",
            minify: false,
            // meta: {
            //     description: "Some description",
            // },
        }),
    ],
};
