/*
 * @autor：xiangzi
 * @Date: 2019-1-16  00：31
 * @Last modified time : 2019-1-16  00：31
 */


'use strict'
require('./index.css');
var _mm   = require('util/mm.js');
console.log(_mm.getUrlParam('keyword'));
//通用页面头部
var header   = {
	init         : function(){
		this.bindEvent();
	},
	//将url中的搜索参数回填至搜索框中
	onLoad : function(){
		var keyword = _mm.getUrlParam('keyword');
		if(keyword){
			$('#search-input').val(keyword);
		};
	},
	// 搜索按钮的点击事件，点击则进行搜索提交
	bindEvent    : function(){
		var _this = this;
		$('#search-btn').click(function(){
			_this.searchSubmit();
		});
		// 按下回车按钮，做搜索提交
		$('#search-input').keyup(function(e){
			// 13是回车键的keyCode
			if(e.keyCode === 13){
				_this.searchSubmit();
			}
		});
	},
	//搜索的提交，这里就是调到list页，并且把搜索参数传过去，剩下的逻辑由list页来处理。
	searchSubmit : function(){
		var keyword = $.trim($('#search-input').val());
		// 如果提交的时候有keyword，正常跳转到list页
		if(keyword){
			window.location.href = './list.html?keyword=' + keyword;
		}
		// 如果keyword为空，则返回首页
		else{
			_mm.goHome();
		}
	}
};
//模块输出的时候初始化一下header对象，因为没有地方会调用这个搜索所以就不用输出啦！
header.init();
