const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const pjson = require('./package.json');
const dev = process.env.NODE_ENV === 'development';

module.exports = {
    entry: './src/client/app.ts',
    output: {
        path: path.join(__dirname, 'dist'), //
        publicPath: '/',
        filename: dev ? pjson.name + '.js': pjson.name + '.[hash].js'
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
            inject: true
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
    module.exports.devtool = '#source-map';
    // http://vue-loader.vuejs.org/en/workflow/production.html
    module.exports.plugins = (module.exports.plugins || []).concat([
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: '"production"'
            }
        }),
        new webpack.optimize.UglifyJsPlugin({
            sourceMap: true,
            compress: {
                warnings: false
            }
        }),
        new webpack.LoaderOptionsPlugin({
            minimize: true
        })
    ])
}

