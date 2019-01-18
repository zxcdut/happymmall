/*
 * @autor：xiangzi
 * @Date: 2019-1-14  23：32
 * @Last modified time : 2019-1-14  23：32
 */


'use strict'

var _mm   = require('util/mm.js');

var _user = {
	//检查登录状态
	checkLogin : function(resolve,reject){
		_mm.request({
			url      : _mm.getServerUrl('/user/get_user_info.do'),
			method   : 'POST',
			success  : resolve,
			error    : reject
		});
	},
	// 这个function(resolve,reject) 是个啥意思啊？
	logout : function(resolve,reject){
		_mm.request({
			url      : _mm.getServerUrl('/user/logout.do'),
			method   : 'POST',
			success  : resolve,
			error    : reject
		});
	}
}
module.exports = _user;