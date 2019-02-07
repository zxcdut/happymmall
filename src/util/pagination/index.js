/*
 * @autor：xiangzi
 * @Date: 2019-1-13  12：22
 * @Last modified time : 2019-1-13  12：22
 */


'use strict'
require('./index.css');
var _mm                = require('util/mm.js');
var templatePagination = require('./index.string');

var Pagination = function(){
	var _this = this;
	this.defaultOption = {
		container    :null,
		pageNum      :1,
		pageRange    :3,
		onSelectPage :null
	};
};
// 渲染分页组件
Pagination.prototype.render = function(userOption){
	//合并选项
	this.option = $.extend({}, this.defaultOption, userOption);
	//判断容器是否为合法的jquery对象
	if(!(this.option.container instanceof jQuery)){
		return;
	}
	//判断是否只有1页
	if(this.option.pages <= 1 ){
		return;
	}
	//渲染分页内容
	this.option.container.html(this.getPaginationHtml());
};
// 获取分页的html，|上一页| 1 2 3 4 =5= 6 |下一页| 5/6
Pagination.prototype.getPaginationHtml = function(){
	var html='';
	var option     = this.option;
	var pageArray  = [];
	var start      = option.pageNum - option.pageRange > 0 ? option.pageNum - option.pageRange : 1;
	var end        = option.pageNum + option.pageRange < option.pages ? option.pageNum + option.pageRange : option.pages;
	//上一页按钮的数据
	pageArray.push({
		name     : '上一页',
		value    : this.option.prePage,
		disabled : !this.option.hasPreviousPage
	});
	// 数字按钮的处理
	for(var i = start; i<=end ; i++){
		pageArray.push({
			name   : i,
			value  : i,
			active : (i === option.pageNum)
		});
	};
	//下一页按钮的数据
	pageArray.push({
		name     : '下一页',
		value    : this.option.nextPage,
		disabled : !this.option.hasNextPage
	});
	html = _mm.renderHtml(templatePagination,{
		pageArray   : pageArray,
		pageNum     : option.pageNum,
		pages       : option.pages
	});
	return html;
};

module.exports = Pagination;
