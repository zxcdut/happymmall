/*
 * @autor：xiangzi
 * @Date: 2019-1-14  23：32
 * @Last modified time : 2019-1-14  23：32
 */


'use strict'
require('./index.css');
var _mm   = require('util/mm.js');
var _user = require('service/user-service.js');
var _cart = require('service/cart-service.js');
var nav   = {
	init         : function(){
		this.bindEvent();
		this.loadUserInfo();
		this.loadCartCount();
		//很关键的一步，这样输出的时候才是nav对象本身
		return this;      
	},
	bindEvent    : function(){
		// 登录点击事件
		$('.js-login').click(function(){
			_mm.doLogin();
		});
		// 注册点击事件
		$('.js-register').click(function(){
			window.location.href = './user-register.html' 
		});
		// 退出点击事件
		$('.js-logout').click(function(){
			_user.logout(function(res){
				window.location.reload();
			},function(errMsg){
				_mm.errorTips(errMsg);
			});
		});
	},
	//加载用户信息
	loadUserInfo : function(){
		_user.checkLogin(function(res){
				$('.user.not-login').hide().siblings('.user.login').show()
				     .find('.username').text(res.username);
			},function(errMsg){
				
		});
	},
	//加载购物车数量
	loadCartCount : function(){
		_cart.getCartCount(function(res){
			$('.nav .cat-count').text(res || 0);
		},function(errMsg){
			$('.nav .cat-count').text(0);
		});
	}
};
//模块输出的时候初始化一下nav对象
module.exports = nav.init();
