const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const OptimizeCSSPlugin = require('optimize-css-assets-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const pjson = require('./package.json');
const dev = process.env.NODE_ENV === 'development';

module.exports = {
    entry: './src/client/app.ts',
    output: {
        path: path.join(__dirname, 'dist'), //
        publicPath: '/',
        filename: dev ? pjson.name + '.js' : pjson.name + '.[hash].js'
    },
    resolve: {
        extensions: ['.ts', '.js', '.vue', '.json'],
        alias: {
            'vue$': 'vue/dist/vue.esm.js',
            '@client': path.join(__dirname, 'src/client/'),
        }
    },
    module: {
        rules: [
            {
                test: /\.vue$/,
                loader: 'vue-loader',
                options: {
                    // preLoaders: {
                    //     ts: 'ts-loader!tslint-loader',
                    //     options: {
                    //         configFile: path.join(__dirname, 'tslint.json'),
                    //         tsConfigFile: path.join(__dirname, 'tsconfig.json'),
                    //         formatter: 'stylish',
                    //     }
                    // },
                    loaders: {
                        'scss': 'vue-style-loader!css-loader!sass-loader',
                        'sass': 'vue-style-loader!css-loader!sass-loader?indentedSyntax',
                    }
                    // other vue-loader options go here
                }
            },
            {
                test: /\.tsx?$/,
                loader: 'ts-loader',
                options: {
                    appendTsSuffixTo: [/\.vue$/],
                    context: path.join(__dirname, 'src/client')
                }
            },
            {
                test: /\.scss$/,
                include: path.join(__dirname, 'src/client'),
                use: [{
                    loader: "style-loader" // creates style nodes from JS strings
                }, {
                    loader: "css-loader" // translates CSS into CommonJS
                }, {
                    loader: "sass-loader" // compiles Sass to CSS
                }]
            },
            {
                test: /\.(png|jpg|jpg|gif|svg)(\?.*)?$/,
                loader: 'url-loader',
                include: path.join(__dirname, 'src/client'),
                options: {
                    limit: 10000,
                    name: dev ? 'img/[name].[ext]' : 'img/[name].[hash:7].[ext]'
                }
            },
            {
                test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
                loader: 'url-loader',
                include: path.join(__dirname, 'src/client'),
                options: {
                    limit: 10000,
                    name: dev ? 'media/[name].[ext]' : 'media/[name].[hash:7].[ext]'
                }
            },
            {
                test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
                loader: 'url-loader',
                include: path.join(__dirname, 'src/client'),
                options: {
                    limit: 10000,
                    // name: utils.assetsPath('fonts/[name].[hash:7].[ext]')
                }
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            filename: dev ? 'index.html' : 'index.[hash:7].html', // output path within static folder -> dist/index.html
            template: path.join(__dirname, 'src/client/index.html'), // html entry used
            inject: true,
            minify: process.env.NODE_ENV === 'production' ? {
                removeComments: true,
                collapseWhitespace: true,
                removeAttributeQuotes: true
            } : {},
            chunksSortMode: 'dependency'
        }),
        new HtmlWebpackPlugin({
            filename: dev ? 'home.html' : 'home.[hash:7].html', // output path within static folder -> dist/index.html
            template: path.join(__dirname, 'src/client/amp/home.html'), // html entry used
            inject: true
        }),
        new CopyWebpackPlugin([
            { from: 'src/client/assets/**/*', to: './img', flatten: true },
        ])
    ],
    devServer: {
        historyApiFallback: true,
        noInfo: true
    },
    performance: {
        hints: false
    },
    devtool: '#eval-source-map'
};


if (process.env.NODE_ENV === 'production') {
    // http://vue-loader.vuejs.org/en/workflow/production.html
    module.exports.plugins = (module.exports.plugins || []).concat([
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: '"production"'
            }
        }),
        new UglifyJsPlugin({
            sourceMap: false,
            uglifyOptions: {
                compress: {
                    warnings: false
                }
            },
            parallel: true
        }),
        new webpack.LoaderOptionsPlugin({
            minimize: true
        }),
        // extract css into its own file
        // new ExtractTextPlugin({
        //     filename: utils.assetsPath('css/[name].[contenthash].css'),
        //     allChunks: true, //https://github.com/vuejs-templates/webpack/issues/1110
        // }),
        // new OptimizeCSSPlugin({
        //     assetNameRegExp: /\.optimize\.css$/g,
        //     cssProcessor: require('cssnano'),
        //     cssProcessorOptions: { discardComments: { removeAll: true } },
        //     canPrint: true
        // }),
        new BundleAnalyzerPlugin()
    ])
}

