const fs = require('fs');
const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const FixStyleOnlyEntriesPlugin = require("webpack-fix-style-only-entries");

module.exports = {
    entry: {
        react: path.resolve(__dirname, 'src/react/index.tsx'),
        style: path.resolve(__dirname, 'src/scss/style/style.scss'),
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: '[name].js',
        library: 'FigmaUIKit',
        libraryTarget: 'umd'
    },
    externals: [
        {
            react: {
                root: 'React',
                amd: 'react',
                commonjs: 'react',
                commonjs2: 'react',
            },
        }
    ],
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: 'ts-loader',
                exclude: /node_modules/
            },
            {
                test: /\.scss$/,
                loader: [
                    {
                        loader: MiniCssExtractPlugin.loader,
                    },
                    {
                        loader: 'css-loader',
                        options: {
                            modules: true,
                            localIdentName: '[name]__[local]___[hash:base64:5]',
                            camelCase: true,
                            sourceMap: false,
                        }
                    },
                    {
                        loader: 'sass-loader',
                        options: {
                            sourceMap: false,
                        }
                    },
                    {
                        loader: 'sass-resources-loader',
                        options: {
                            resources: fs.readdirSync(path.join(__dirname, 'src/scss/resources')).map(file => (
                                path.join(__dirname, 'src/scss/resources', file)
                            ))
                        }
                    }
                ]
            }
        ]
    },
    resolve: {
        extensions: ['.tsx', '.ts', '.js', '.scss']
    },
    plugins: [
        new FixStyleOnlyEntriesPlugin(),
        new MiniCssExtractPlugin({
            filename: '[name].css',
            chunkFilename: '[id].css'
        })
    ],
};