/*
 * @autor：xiangzi
 * @Date: 2019-2-3  19：49
 * @Last modified time : 2019-2-3  19：49
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

// 登录页的逻辑部分
var page = {
	init      : function(){
		this.onLoad();
		this.bindEvent();
	},
	onLoad : function(){
		// 初始化左侧菜单
		navSide.init({
			name: 'user-pass-update'
		});
	},
	bindEvent : function(){
        var _this = this;
		$(document).on('click','.btn-submit',function(){
			//点击提交按钮后的动作
			var userInfo = {
				password        : $.trim($('#password').val()),
				passwordNew     : $.trim($('#password-new').val()),
				passwordConfirm : $.trim($('#password-confirm').val())
			};
			var validateResult = _this.validateForm(userInfo);
			if(validateResult.status){
				// 更改用户密码
				_user.updatePassword({
					passwordOld : userInfo.password,
					passwordNew : userInfo.passwordNew
				},function(res,msg){
					_mm.successTips(msg);
				},function(errMsg){
					_mm.errorTips(errMsg);
				});
			}
			else{
				_mm.errorTips(validateResult.msg);
			}
		});
	},
	// 加载用户信息
	loadUserInfo : function(){
		var userHtml = '';
		_user.getUserInfo(function(res){
			
		},function(errMsg){
			_mm.errorTips(errMsg);
		});
	},
	// 验证字段信息
	validateForm : function(userInfo){
		var result = {
			status : false,
			msg    : '',
		};
		// 验证原密码是否为空
		if(!_mm.validate(userInfo.password,'required')){
			result.msg = '原密码不能为空';
			return result;
		}
		// 验证新密码长度
		if(!userInfo.passwordNew || userInfo.passwordNew.length < 6){
			result.msg = '新密码长度不能少于6位';
			return result;
		}
		// 验证两次输入的密码是否一致
		if(userInfo.passwordNew !== userInfo.passwordConfirm){
			result.msg = '两次输入的密码不一致';
			return result;
		}
		// 通过验证，返回正确提示
		result.status = true;
		result.msg    = '验证通过';
		return result;
	}
};
$(function(){
	page.init();
});
