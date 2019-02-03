/*
 * @autor：xiangzi
 * @Date: 2019-1-20  13：40
 * @Last modified time : 2019-1-20  13：40
 */


'use strict'
require('./index.css');
require('page/common/nav-simple/index.js');
var _user = require('service/user-service.js');
var _mm   = require('util/mm.js');

//表单里的错误提示
var formError = {
	show : function(errMsg){
		$('.error-item').show().find('.err-msg').text(errMsg);
	},
	hide : function(){
		$('.error-item').hide().find('.err-msg').text('');
	}
};
// 登录页的逻辑部分
var page = {
	init      : function(){
		//初始化一些事件，再绑定一些信息
		this.bindEvent()
	},
	// 事件函数，可以理解为用户对页面的操作
	bindEvent : function(){
		var _this = this;
		// 验证username，姓名输入框失去焦点时验证用户名是否已存在
		$('#username').blur(function(){
			var username = $.trim($(this).val());
			//如果用户名为空，则不做用户名验证
			if(!username){
				return
			}
			// 异步验证用户名是否存在
			_user.checkUsername(username,function(res){
				formError.hide();
			},function(errMsg){
				formError.show(errMsg);
			});
		});
		// 点击注册按钮触发提交事件
		$('#submit').click(function(){
			_this.submit();
		});
		// 如果按下回车键，也进行提交
		$('.user-content').keyup(function(e){
			// keyup == 13，表示回车键
			if(e.keyup ==13 ){
				_this.submit();
			}
		});
	},
	// 封装一个伪提交表单
	submit    : function(){
		//提交后端之前肯定是要前端先做表单验证
		//将文本框中用户输入的内容取出来
		var formData = {
			username        : $.trim($('#username').val()),
			password        : $.trim($('#password').val()),
			passwordConfirm : $.trim($('#password-confirm').val()),
			phone           : $.trim($('#phone').val()),
			email           : $.trim($('#email').val()),
			question        : $.trim($('#question').val()),
			answer          : $.trim($('#answer').val()),
		};
		console.log('用户名:' + formData.username);
		console.log('第一个密码：'+　formData.password);
		console.log('第二个密码:' + formData.passwordConfirm);
		console.log('提示问题答案:' + formData.answer);
		// 获取表单验证的结果
		var validateResult = this.formValidate(formData);
		// 表单验证成功时
		if(validateResult.status){
            console.log('开始调用_user.login（）函数');
			_user.register(formData,function(res){
				window.location.href = './result.html?type=register';
			},function(errMsg){
				formError.show(errMsg);
			});
		}
		//验证失败时
		else{
			//前端展示错误提示
			formError.show(validateResult.msg);
		}
	},
	//表单字段的验证
	formValidate : function(formData){
		var result = {
			status : false,
			msg    : '',
		};
		// 当formData.username为空值是触发该函数
		if(!_mm.validate(formData.username,'required')){
			result.msg = '用户名不能为空';
			return result;
		}
		// 当formData.password为空值是触发该函数
		if(!_mm.validate(formData.password,'required')){
			result.msg = '用户密码不能为空';
			return result;
		}
		// 验证密码长度
		if(formData.password.length < 6){
			result.msg = '密码长度不能少于6位';
			return result;
		}
		// 验证两次输入的密码是否一致
		if(formData.password !== formData.passwordConfirm){
			result.msg = '两次输入的密码不一致';
			return result;
		}
		// 验证手机号
		if(!_mm.validate(formData.phone,'phone')){
			result.msg = '手机号格式不正确';
			return result;
		}
		// 验证邮箱
		if(!_mm.validate(formData.email,'email')){
			result.msg = '邮箱格式不正确';
			return result;
		}
		// 验证密码提示问题
		if(!_mm.validate(formData.question,'required')){
			result.msg = '密码提示问题不能为空';
			return result;
		}
		// 验证密码提示问题答案
		if(!_mm.validate(formData.answer,'required')){
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
