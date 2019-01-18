
var webpack           = require('webpack');
var ExtractTextPlugin = require("extract-text-webpack-plugin");
var HtmlWebpackPlugin = require("html-webpack-plugin");
//环境变量的配置，dev /online
var WEBPACK_ENV       = process.env.WEBPACK || 'dev';
//获取html-webpack-plugin参数的方法。
var getHtmlConfig = function(name,title){
	return{
		template  :  './src/view/' + name + '.html',
	    filename  :  'view/' + name + '.html',
	    title     :  title,
	    inject    :  true, 
	    hash      :  true,
	    chunks    :  ['common',name],
	}
};
//webpack config
var config = {
	entry:{
		//common是所有页面都会有的一个组建，再打包的时候都会把这个common打包进去。
		'common' :['./src/page/common/index.js'],
		'index'  :['./src/page/index/index.js'],
		'login'  :['./src/page/login/index.js'],
		'result' :['./src/page/result/index.js'],
	},
	output:{
		path:__dirname+'/dist',
		filename:'js/[name].js',
		publicPath: '/dist'
	},
	externals : {
		'jquery' : 'window.jQuery'
	},
	module: {
		loaders: [
		    { test:/\.css$/,loader:ExtractTextPlugin.extract({ fallback: 'style-loader', use: 'css-loader' }) },
		    { test:/\.(gif|png|jpg|woff|svg|eot|ttf)\??.*$/,loader: 'url-loader?limit=100&name=resource/[name].[ext]' },
		    { test:/\.string$/,loader: 'html-loader'}
		]
	},
	// 配置路径，啥原理还没搞明白,反正就先照着视频写了，回头再去详细学吧
	resolve : {
		alias : {
			node_modules  : __dirname + '/node_modules',
			util          : __dirname + '/src/util',
			page          : __dirname + '/src/page',
			service       : __dirname + '/src/service',
			image         : __dirname + '/src/image'
		}
	},
	plugins : [
	    //独立通用模块到js/base.js
	    new webpack.optimize.CommonsChunkPlugin({
	   	name : 'common',
	   	filename : 'js/base.js'
	   }),
	   //把css单独打包到文件里
	    new ExtractTextPlugin({
	    	filename : "css/[name].css"
	    }),
	    //html模板的处理，每个页面都需要配置一个。
	    new HtmlWebpackPlugin(getHtmlConfig('index','首页')),
	    new HtmlWebpackPlugin(getHtmlConfig('login','用户登录')),
	    new HtmlWebpackPlugin(getHtmlConfig('list')),
	    new HtmlWebpackPlugin(getHtmlConfig('result','操作结果')),
	]
};

if('dev' === WEBPACK_ENV){
	config.entry.common.push('webpack-dev-server/client?http://localhost:8088/')
};

module.exports = config;
