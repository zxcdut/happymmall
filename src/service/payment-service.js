/*
 * @autor：xiangzi
 * @Date: 2019-02-13  22：13
 * @Last modified time : 2019-02-13  22：13
 */


'use strict'

var _mm   = require('util/mm.js');

var _payment = {
	// 获取支付信息
	getPaymentInfo : function(orderNumber,resolve,reject){
		_mm.request({
			url      : _mm.getServerUrl('/order/pay.do'),
			data     : {
			   orderNo : orderNumber	
			},
			method   : 'POST',
			success  : resolve,
			error    : reject
		});
	},
	// 获取订单状态
	getPaymentStatus : function(orderNumber,resolve,reject){
		_mm.request({
			url      : _mm.getServerUrl('/order/query_order_pay_status.do'),
			data     : {
			   orderNo : orderNumber	
			},
			method   : 'POST',
			success  : resolve,
			error    : reject
		});
	}
};
module.exports = _payment;