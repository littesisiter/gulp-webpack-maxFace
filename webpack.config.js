var CommonsChunkPlugin = require("webpack/lib/optimize/CommonsChunkPlugin");
var path = require('path');
var webpack = require('webpack');
var fs = require('fs');
var uglifyJsPlugin = webpack.optimize.UglifyJsPlugin;
var ExtractTextPlugin = require("extract-text-webpack-plugin");
var srcDir = path.resolve(process.cwd(), 'src');

var cssExtractor = new ExtractTextPlugin('../css/[name].css');

//获取多页面的每个入口文件，用于配置中的entry
function getEntry() {
    console.log('--------------getEntry')
    var jsPath = path.resolve(srcDir, 'js');
    var dirs = fs.readdirSync(jsPath);
    var matchs = [], files = {};
    dirs.forEach(function (item) {
        matchs = item.match(/(.+)\.js$/);
        if (matchs) {
            files[matchs[1]] = path.resolve(srcDir, 'js', item);
        }
    });
    console.log('-----------' + JSON.stringify(files));
    return files;
}

module.exports = {
    cache: true,
    devtool:"source-map",
    entry: getEntry(),
    output: {
        path: path.join(__dirname, "dist/js/"),
        publicPath: "dist/js/",
        filename: "[name].js",
        chunkFilename: "[chunkhash].js"
    },
    module:  {
        loaders: [
            { test: /\.css$/, loader: cssExtractor.extract("style-loader", "css-loader") },
            { test: /\.(gif|jpg|png|woff|svg|eot|ttf)\??.*$/,loader:'url-loader?limit=50000&name=[path][name].[ext]'}
        ]
    },
    resolve: {
        alias: {
            zepto: srcDir + "/js/lib/zepto.min.js",
            component:srcDir + "/js/component",
            mp3:srcDir + "/js/mp3",
            data: srcDir + "/js/data"
        }
    },
    plugins: [
        new CommonsChunkPlugin({name:'common'}),
        new uglifyJsPlugin({
            compress: {
                warnings: false
            }
        }),
        cssExtractor
    ]
};