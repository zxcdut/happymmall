/*
 * @autor：xiangzi
 * @Date: 2019-2-2  22：51
 * @Last modified time : 2019-2-2  22：51
 * 
 */

'use strict'
require('./index.css');
//引用common中nav-simple下的index.js
require('page/common/nav-simple/index.js');
//引用common中nav下的index.js
require('page/common/nav/index.js');
//引用common中header下的index.js
require('page/common/header/index.js');
//引用common中nav-side下的index.js
var navSide       = require('page/common/nav-side/index.js');
// require('util/mm.js')就表示引入util/mm.js了，
//但为什么还要有个var _mm呢？就是因为便于后续使用里面的方法呀！
var _mm           = require('util/mm.js');
var _user         = require('service/user-service.js');
var templateIndex = require('./index.string');

// 登录页的逻辑部分
var page = {
	init      : function(){
		this.onLoad();
	},
	onLoad : function(){
		// 初始化左侧菜单
		navSide.init({
			name: 'user-center'
		});
		// 加载用户信息
		this.loadUserInfo();
	},
	// 加载用户信息
	loadUserInfo : function(){
		var userHtml = '';
		_user.getUserInfo(function(res){
			userHtml = _mm.renderHtml(templateIndex,res);
			$('.panel-body').html(userHtml);
		},function(errMsg){
			_mm.errorTips(errMsg);
		});
	}
};
$(function(){
	page.init();
});
