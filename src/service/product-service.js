/*
 * @autor：xiangzi
 * @Date: 2019-01-06  08：30
 * @Last modified time : 2019-01-06  08：30
 */


'use strict'

var _mm   = require('util/mm.js');

var _product = {
	// 获取商品列表
	getProductList : function(listParam,resolve,reject){
		_mm.request({
			url      : _mm.getServerUrl('/product/list.do'),
			data     : listParam,
			method   : 'POST',
			success  : resolve,
			error    : reject
		});
	},
	// 获取商品详细信息
	getProductDetail : function(productId,resolve,reject){
		_mm.request({
			url      : _mm.getServerUrl('/product/detail.do'),
			data     : {
				productId : productId
			},
			method   : 'POST',
			success  : resolve,
			error    : reject
		});
	}
}
module.exports = _product;