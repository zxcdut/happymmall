/*
 * @autor：xiangzi
 * @Date: 2019-1-13  12：22
 * @Last modified time : 2019-1-13  12：22
 */


'use strict'
var Hogan = require('hogan.js');
var conf = {
	serverHost : ''
};
//定义一个_mm对象
var _mm = {
	// 网络请求
	request : function(param){
		//为了在这个request函数内容能调用到doLogin函数，需要先引用_mm对象。
		var _this = this;
		$.ajax({
			type        : param.method || "get",
			url         : param.url    || "",
			dataType    : param.type   || "json",
			data        : param.data   || "",
			success     : function(res){
				// 请求成功，会返回res对象。
				if(0 === res.status){
					typeof param.success === 'function' && param.success(res.data,res.msg);
				}
				// 没有登录状态，需要强制登录
				else if(10 === res.status){
					_this.doLogin();
				}
				//请求数据错误
				else if(1 === res.status){
					typeof param.error === 'function' && param.error(res.msg)
				}
			},
			error       : function(err){
				typeof param.error === 'function' && param.error(error.statusText);
			}
		});
	},
	// 获取服务器地址
	getServerUrl : function(path){
		return conf.serverHost + path;
	},
	// 获取url中的参数
	getUrlParam  : function(name){
		var reg      = new RegExp('(^|&)' + name + '=([^&]*)(&|$)');
		var result   = window.location.search.substr(1).match(reg);
		return result ? decodeURIComponent(result[2]) : null;
	},
	// 渲染html模板，传入模板和数据，方法体是将模板和数据进行拼接后生成html文档
	renderHtml : function(htmlTemplate,data){
		// 先编译html模板
		var template    = Hogan.compile(htmlTemplate);
		// 渲染模板
		var result      = template.render(data);
		return result;
	},	
	// 成功提示
	successTips : function(msg){
		alert(msg || '操作成功！');
	},
	// 错误提示
	errorTips : function(msg){
		alert(msg || '哪里不对了');
	},
	// 字段的验证，支持非空、手机、邮箱的判断
	validate : function(value,type){
		var value = $.trim(value);
		//非空验证,当value为空时，返回false;当value有值时，返回ture。
		if('required' === type){
			return !!value;
		}
		// 手机号验证
		if('phone' === type){
			return /^1\d{10}$/.test(value);
		}
		// 邮箱格式验证
		if('email' === type){
			return /^(\w)+(\.\w+)*@(\w)+((\.\w{2,3}){1,3})$/.test(value);
		}
	},
	// 统一登录处理
	doLogin : function(){
		//跳转至登录页面，且url参数中传递当前页面路径，登录成功后回到当前页面。
		window.location.href = './user-login.html?redirect=' + encodeURIComponent(window.location.href);
	},
	// 回到主页
	goHome : function(){
		window.location.href = './index.html';
	}
}; 
//将_mm对象向外输出
module.exports = _mm;
