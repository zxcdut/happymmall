/*
 * @autor：xiangzi
 * @Date: 2019-1-15  09：24
 * @Last modified time : 2019-1-15  09：24
 */


'use strict'

var _mm   = require('util/mm.js');

var _cart = {
	//检查登录状态
	getCartCount : function(resolve,reject){
		_mm.request({
			url      : _mm.getServerUrl('/cart/get_cart_product_count.do'),
			method   : 'POST',
			success  : resolve,
			error    : reject
		});
	},
	// 添加到购物车
	addToCart : function(productInfo,resolve,reject){
		_mm.request({
			url      : _mm.getServerUrl('/cart/add.do'),
			method   : 'POST',
			data     : productInfo,
			success  : resolve,
			error    : reject
		});
	}
}
module.exports = _cart;