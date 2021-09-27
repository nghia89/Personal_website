const path = require("path")
const webpack = require("webpack")
const HtmlWebpackPlugin = require("html-webpack-plugin")
const CopyPlugin = require("copy-webpack-plugin")
const Dotenv = require("dotenv-webpack")
const MiniCssExtractPlugin = require("mini-css-extract-plugin")
const { CleanWebpackPlugin } = require("clean-webpack-plugin")
const CompressionPlugin = require("compression-webpack-plugin")
const BundleAnalyzerPlugin = require("webpack-bundle-analyzer").BundleAnalyzerPlugin

module.exports = async (env, agrv) => {
    const isDev = agrv.mode === "development"
    const isAnalyze = env && env.analyze

    const basePlugins = [
        new Dotenv(),
        new HtmlWebpackPlugin({
            template: "public/index.html"
        }),
        new CopyPlugin({
            patterns: [
                {
                    from: "**/*",
                    globOptions: {
                        ignore: ["index.html"]
                    },
                    globOptions: {
                        dot: true,
                        gitignore: true,
                        ignore: ["**/index.html"],
                    },
                    to: "",
                    context: path.resolve("public")
                },
            ]
        }),
        new MiniCssExtractPlugin({
            filename: isDev ? "static/css/[name].[contenthash:6].css" : "static/css/[name].[contenthash:6].css"
        }),
        new webpack.ProgressPlugin()
    ]
    let prodPlugins = [
        ...basePlugins,
        new CleanWebpackPlugin(),
        new CompressionPlugin({
            test: /\.(css|js|html|svg)$/
        })
    ]
    if (isAnalyze) {
        prodPlugins = [...prodPlugins, new BundleAnalyzerPlugin()]
    }
    return {
        entry: "./src/index.js",
        module: {
            rules: [
                {
                    test: /\.(js|ts|tsx)$/,
                    use: ["ts-loader", "eslint-loader"],
                    exclude: /node_modules/
                },
                {
                    test: /\.(s[ac]ss|css)$/,
                    use: [
                        MiniCssExtractPlugin.loader,
                        {
                            loader: "css-loader",
                            options: { sourceMap: isDev ? true : false }
                        },
                        {
                            loader: "sass-loader",
                            options: { sourceMap: isDev ? true : false }
                        }
                    ]
                },
                {
                    test: /\.(eot|ttf|woff|woff2)$/,
                    use: [
                        {
                            loader: "file-loader",
                            options: {
                                name: isDev ? "[path][name].[contenthash:6].[ext]" : "static/fonts/[name].[contenthash:6].[ext]"
                            }
                        }
                    ]
                },
                {
                    test: /\.(png|svg|jpg|gif)$/,
                    use: [
                        {
                            loader: "file-loader",
                            options: {
                                name: isDev
                                    ? "static/media/[name].[contenthash:6].[ext]"
                                    : "static/media/[name].[contenthash:6].[ext]"
                            }
                        }
                    ]
                }
            ]
        },
        resolve: {
            extensions: [".tsx", ".ts", ".jsx", ".js"],
            alias: {
                "@": path.resolve("src")
            }
        },
        output: {
            path: path.resolve("build"),
            publicPath: "/",
            filename: "static/js/main.[contenthash:6].js",
            environment: {
                arrowFunction: false,
                bigIntLiteral: false,
                const: false,
                destructuring: false,
                dynamicImport: false,
                forOf: false,
                module: false
            }
        },
        devtool: isDev ? "source-map" : false,
        devServer: {
            static: path.join("build"),
            historyApiFallback: true,
            port: 4200,
            open: true,
            hot: true,
            client: {
                overlay: {
                    errors: true,
                    warnings: false,
                },
            }
        },
        plugins: isDev ? basePlugins : prodPlugins,
        performance: {
            maxEntrypointSize: 800000, //  Khi có 1 file build vượt quá giới hạn này (tính bằng byte) thì sẽ bị warning trên terminal.
            //hints: 'error',
        }
    }
}