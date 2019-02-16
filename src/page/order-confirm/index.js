/*
 * @autor：xiangzi
 * @Date: 2019-02-07  19：53
 * @Last modified time : 2019-02-07  19：53
 */

'use strict'
require('./index.css');
require('page/common/header/index.js');
require('page/common/nav/index.js');
var _mm             = require('util/mm.js');
var _order          = require('service/order-service.js');
var _address        = require('service/address-service.js');
var templateAddress = require('./address-list.string');
var templateProduct = require('./product-list.string');
var addressModal    = require('./address-modal.js');

var page = {
	data   : {
		selectedAddressId : null
	},
	init   : function(){
		this.onLoad();
		this.bindEvent();
	},
	onLoad : function(){
		this.loadAddressList();
		this.loadProductList();
	},
	bindEvent : function(){
		var _this = this;
		//点击地址选中的事件
		$(document).on('click','.address-item',function(){
			$(this).addClass('active').siblings('.address-item').removeClass('active');
			// 记录当前选中地址的id，到时候传给后端
			_this.data.selectedAddressId = $(this).data('id');
		});
		//订单的提交
		$(document).on('click','.order-submit',function(){
			var shippingId = _this.data.selectedAddressId;
			if(shippingId){
				_order.createOrder({
					shippingId : shippingId
				},function(res){
					window.location.href = './payment.html?orderNumber=' + res.orderNo;
				},function(errMsg){
					_mm.errorTips(errMsg);
				});
			}else{
				_mm.errorTips("请选择地址后再提交订单");
			}
		});
		// 地址的添加
		$(document).on('click','.address-add',function(){
			addressModal.show({
				isUpdate  : false,
				onSuccess : function(){
					_this.loadAddressList();
				}
			});
		});
		// 地址的编辑
		$(document).on('click','.address-update',function(e){
			// 阻止其向上冒泡
			e.stopPropagation();
			var shippingId = $(this).parents('.address-item').data('id');
			_address.getAddress(shippingId,function(res){
				addressModal.show({
				isUpdate  : true,
				data      : res,
				onSuccess : function(){
					_this.loadAddressList();
				}
			});
			},function(errMsg){
				_mm.errorTips(errMsg);
			});
		});
		// 地址的删除
		$(document).on('click','.address-delete',function(e){
			// 阻止其向上冒泡
			e.stopPropagation();
			var id = $(this).parents('.address-item').data('id');
            if(window.confirm('确定要删除该地址？')){
				_address.deleteAddress(id,function(res){
					_this.loadAddressList();
				},function(errMsg){
					_mm.errorTips(errMsg);
				});
			}
		});
	},
	// 加载地址列表
	loadAddressList : function(){
		var _this = this;
		$('.address-con').html('<div class="loading"></div>')
		//获取地址列表
		_address.getAddressList(function(res){
			_this.addressFilter(res);
			var addressListHtml = _mm.renderHtml(templateAddress,res);
			$('.address-con').html(addressListHtml);
		},function(errMsg){
			$('.address-con').html('<p class="err-tip">地址加载失败，请刷新后重试</p>')
		});
	},
	// 处理地址列表中的选中状态
	addressFilter : function(data){
		// 如果数据中有选中的id
		if(this.data.selectedAddressId){
			// 这句话是用来干吗的啊？
			var selectedAddressIdFlag = false;
			// 把当前的id和选中的那个id一个个做对比
			for(var i = 0,length = data.list.length;i<length;i++){
				if(data.list[i].id === this.data.selectedAddressId){
					data.list[i].isActive = true;
					selectedAddressIdFlag = true;
				}
			};
			// 如果以前选中的地址不在列表里，将选中的id删除
			if(!selectedAddressIdFlag){
				this.data.selectedAddressId = null;
			}
		}
	},
	// 加载商品清单
	loadProductList : function(){
		var _this = this;
		$('.product-con').html('<div class="loading"></div>');
		//获取商品清单
		_order.getProductList(function(res){
			var productListHtml = _mm.renderHtml(templateProduct,res);
			$('.product-con').html(productListHtml);
		},function(errMsg){
			$('.product-con').html('<p class="err-tip">商品加载失败，请刷新后重试</p>')
		});
	}
};
$(function(){
	page.init();
});