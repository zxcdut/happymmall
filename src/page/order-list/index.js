/*
 * @autor：xiangzi
 * @Date: 2019-2-16  12：35
 * @Last modified time : 2019-2-16  12：35
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
var _mm            = require('util/mm.js');
var _order         = require('service/order-service.js');
var Pagination     = require('util/pagination/index.js');
var templateIndex  = require('./index.string');

// 订单列表页的逻辑部分
var page = {
	data : {
		listParam : {
			pageNum  : 1,
			pageSize : 10
		}
	},
	init      : function(){
		this.onLoad();
	},
	onLoad : function(){
		this.loadOrderList();
		// 初始化左侧菜单
		navSide.init({
			name: 'order-list'
		});
	},
	// 加载订单列表
	loadOrderList : function(){
		var _this         = this;
		var orderListHtml = '';
		var $listCon      = $('.order-list-con');
		_order.getOrderList(this.data.listParam,function(res){
			_this.dataFilter(res);
			//渲染订单列表的html
			orderListHtml = _mm.renderHtml(templateIndex,res);
			$listCon.html(orderListHtml);
			_this.loadPagination({
				hasPreviousPage : res.hasPreviousPage,
                prePage         : res.prePage,
                hasNextPage     : res.hasNextPage,
                nextPage        : res.nextPage,
                pageNum         : res.pageNum,
                pages           : res.pages
			});
		},function(errMsg){
			$listCon.html('<p class="err-tip">加载订单失败，请刷新后重试</p>')
		});
	},
	// 后端接口返回数据的适配
	dataFilter : function(data){
		data.isEmpty = !data.list.length;
	},
	//加载分页信息
	loadPagination : function(pageInfo){
		var _this = this;
		this.pagination ? '' : (this.pagination = new Pagination());
		this.pagination.render($.extend({},pageInfo,{
			container : $('.pagination'),
			onSelectPage : function(pageNum){
				_this.data.listParam.pageNum = pageNum;
				_this.loadOrderList();
			}
		}));
	}
};
$(function(){
	page.init();
});
