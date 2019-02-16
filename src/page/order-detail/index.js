/*
 * @autor：xiangzi
 * @Date: 2019-2-16  15：16
 * @Last modified time : 2019-2-16  15：16
 * 
 */

'use strict'
require('./index.css');
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
var templateIndex  = require('./index.string');

// 订单列表页的逻辑部分
var page = {
    data :  {
    	orderNumber : _mm.getUrlParam('orderNumber')
    },
	init      : function(){
		this.onLoad();
		this.bindEvent();
	},
	bindEvent : function(){
		var _this = this;
		$(document).on('click','.order-cancel',function(){
			if(window.confirm('确认要取消该订单？')){
				_order.cancelOrder(_this.data.orderNumber,function(res){
				    _mm.successTips('该订单取消成功');
			        _this.loadDetail();
			    },function(errMsg){
			        _mm.errorTips(errMsg);
		        });
			}
		});
	},
	onLoad : function(){
		// 初始化左侧菜单
		navSide.init({
			name: 'order-list'
		});
		// 加载detail数据
		this.loadDetail();
	},
	// 加载订单详情
	loadDetail : function(){
		var _this         = this;
		var orderDetailHtml = '';
		var $content      = $('.content');
		$content.html('<div class="loading"></div>');
		_order.getOrderDetail(this.data.orderNumber,function(res){
			// 先对后端接口返回的res数据做处理
			_this.dataFilter(res);
			//渲染订单详情的html
			orderDetailHtml = _mm.renderHtml(templateIndex,res);
			$content.html(orderDetailHtml);
		},function(errMsg){
			$content.html('<p class="err-tip">' + errMsg + '</p>');
		});
	},
	// 数据的适配
	dataFilter : function(data){
		data.needPay      = data.status == 10;
		data.isCancelable = data.status == 10;
	}
};
$(function(){
	page.init();
});
