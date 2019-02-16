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
	},
	// 获取购物车列表
	getCartList : function(resolve,reject){
		_mm.request({
			url      : _mm.getServerUrl('/cart/list.do'),
			method   : 'GET',
			success  : resolve,
			error    : reject
		});
	},
	// 选择购物车商品
	selectProduct : function(productId,resolve,reject){
		_mm.request({
			url      : _mm.getServerUrl('/cart/select.do'),
			data     : {
				productId : productId
			},
			method   : 'POST',
			success  : resolve,
			error    : reject
		});
	},
	// 取消选择购物车商品
	unselectProduct : function(productId,resolve,reject){
		_mm.request({
			url      : _mm.getServerUrl('/cart/un_select.do'),
			data     : {
				productId : productId
			},
			method   : 'POST',
			success  : resolve,
			error    : reject
		});
	},
	// 全选购物车商品
	selectAllProduct : function(resolve,reject){
		_mm.request({
			url      : _mm.getServerUrl('/cart/select_all.do'),
			method   : 'GET',
			success  : resolve,
			error    : reject
		});
	},
	// 取消全选购物车商品
	unselectAllProduct : function(resolve,reject){
		_mm.request({
			url      : _mm.getServerUrl('/cart/un_select_all.do'),
			method   : 'GET',
			success  : resolve,
			error    : reject
		});
	},
	// 更新购物车商品数量
	updateProduct  :  function(productInfo,resolve,reject){
		_mm.request({
			url      : _mm.getServerUrl('/cart/update.do'),
			data     : productInfo,
			method   : 'POST',
			success  : resolve,
			error    : reject
		});
	},
	// 删除指定商品
	deleteProduct : function(productIds,resolve,reject){
		_mm.request({
			url      : _mm.getServerUrl('/cart/delete_product.do'),
			data     : {
				productIds : productIds
			},
			method   : 'POST',
			success  : resolve,
			error    : reject
		});
	}
}
module.exports = _cart;