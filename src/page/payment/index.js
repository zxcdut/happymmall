/*
 * @autor：xiangzi
 * @Date: 2019-2-16  18：13
 * @Last modified time : 2019-2-16  18：13
 * 
 */

'use strict'
require('./index.css');
//引用common中nav下的index.js
require('page/common/nav/index.js');
//引用common中header下的index.js
require('page/common/header/index.js');
// require('util/mm.js')就表示引入util/mm.js了，
//但为什么还要有个var _mm呢？就是因为便于后续使用里面的方法呀！
var _mm              = require('util/mm.js');
var _payment         = require('service/payment-service.js');
var templateIndex    = require('./index.string');

// 订单列表页的逻辑部分
var page = {
    data :  {
    	orderNumber : _mm.getUrlParam('orderNumber')
    },
	init      : function(){
		this.onLoad();
	},
	onLoad : function(){
		// 加载detail数据
		this.loadPayment();
	},
	// 加载订单详情
	loadPayment : function(){
		var _this         = this;
		var paymentHtml = '';
		var $pageWrap     = $('.page-wrap');
		$pageWrap.html('<div class="loading"></div>');
		_payment.getPaymentInfo(this.data.orderNumber,function(res){
			//渲染订单详情的html
			paymentHtml = _mm.renderHtml(templateIndex,res);
			$pageWrap.html(paymentHtml);
			// 提交支付成功后，监听订单支付状态
			_this.listenOrderStatus();
		},function(errMsg){
			$pageWrap.html('<p class="err-tip">' + "后端接口出错，原因：" + errMsg + '</p>');
			// 接口报错的话，就不用去监听订单支付状态了，等接口恢复正常后，删除这段代码吧！
			_this.listenOrderStatus();
		});
	},
	// 监听订单状态
	listenOrderStatus : function(){
		var _this = this;
		this.paymentTimer = window.setInterval(function(){
			_payment.getPaymentStatus(_this.data.orderNumber,function(res){
				if(res == true){
					window.location.href = './result.html?type=payment&orderNumber=' + _this.data.orderNumber;
				}
			});
		},5e3);
	}
};
$(function(){
	page.init();
});
