
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
		'common'                :['./src/page/common/index.js'],
		'index'                 :['./src/page/index/index.js'],
		'list'                  :['./src/page/list/index.js'],
		'detail'                :['./src/page/detail/index.js'],
		'user-login'            :['./src/page/user-login/index.js'],
		'user-register'         :['./src/page/user-register/index.js'],
		'user-pass-reset'       :['./src/page/user-pass-reset/index.js'],
		'user-pass-update'      :['./src/page/user-pass-update/index.js'],
		'user-center'           :['./src/page/user-center/index.js'],
		'user-center-update'    :['./src/page/user-center-update/index.js'],
		'result'                :['./src/page/result/index.js'],
	},
	output:{
		path:__dirname+'/dist',
		filename:'js/[name].js',
		publicPath: '/dist/'
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
//	    new webpack.optimize.CommonsChunkPlugin({
//	   	name : 'common',
//	   	filename : 'js/base.js'
//	   }),
	   //把css单独打包到文件里
	    new ExtractTextPlugin({
	    	filename : "css/[name].css"
	    }),
	    //html模板的处理，每个页面都需要配置一个。
	    new HtmlWebpackPlugin(getHtmlConfig('index','首页')),
	    new HtmlWebpackPlugin(getHtmlConfig('list','商品列表页')),
	    new HtmlWebpackPlugin(getHtmlConfig('user-login','用户登录')),
	    new HtmlWebpackPlugin(getHtmlConfig('user-register','用户注册')),
	    new HtmlWebpackPlugin(getHtmlConfig('user-pass-reset','找回密码')),
	    new HtmlWebpackPlugin(getHtmlConfig('user-pass-update','修改密码')),
	    new HtmlWebpackPlugin(getHtmlConfig('user-center','个人中心')),
	    new HtmlWebpackPlugin(getHtmlConfig('user-center-update','编辑个人信息')),
	    new HtmlWebpackPlugin(getHtmlConfig('list','列表页')),
	    new HtmlWebpackPlugin(getHtmlConfig('detail','详情页')),
	    new HtmlWebpackPlugin(getHtmlConfig('result','操作结果')),
	]
};

if('dev' === WEBPACK_ENV){
	config.entry.common.push('webpack-dev-server/client?http://localhost:8088/');
};

module.exports = config;
