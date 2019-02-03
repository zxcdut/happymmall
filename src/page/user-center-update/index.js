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
var templateIndex = require('./index.string');

// 登录页的逻辑部分
var page = {
	init      : function(){
		this.onLoad();
		this.bindEvent();
	},
	onLoad : function(){
		// 初始化左侧菜单
		navSide.init({
			name: 'user-center'
		});
		// 加载用户信息
		this.loadUserInfo();
	},
	bindEvent : function(){
        var _this = this;
		$(document).on('click','.btn-submit',function(){
			//点击提交按钮后的动作
			var userInfo = {
				phone    : $.trim($('#phone').val()),
				email    : $.trim($('#email').val()),
				question : $.trim($('#question').val()),
				answer   : $.trim($('#answer').val())
			};
			var validateResult = _this.validateForm(userInfo);
			if(validateResult.status){
				_user.updateUserInfo(userInfo,function(res,msg){
					_mm.successTips(msg);
					window.location.href = './user-center.html';
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
			userHtml = _mm.renderHtml(templateIndex,res);
			$('.panel-body').html(userHtml);
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
		// 验证手机号
		if(!_mm.validate(userInfo.phone,'phone')){
			result.msg = '手机号格式不正确';
			return result;
		}
		// 验证邮箱
		if(!_mm.validate(userInfo.email,'email')){
			result.msg = '邮箱格式不正确';
			return result;
		}
		// 验证密码提示问题
		if(!_mm.validate(userInfo.question,'required')){
			result.msg = '密码提示问题不能为空';
			return result;
		}
		// 验证密码提示问题答案
		if(!_mm.validate(userInfo.answer,'required')){
			result.msg = '密码提示问题答案不能为空';
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
