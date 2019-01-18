/*
 * @autor：xiangzi
 * @Date: 2019-1-17  01：19
 * @Last modified time : 2019-1-17  01：19
 */


'use strict'
require('./index.css');
var _mm           = require('util/mm.js');
var templateIndex = require('./index.string');
console.log(3333);
// 侧边导航
var navSide   ={
	option : {
		//name是当前页面名称
		name : '',
		navList : [
		     {name : 'user-center',desc : '个人中心',href : './user-center.html',active : true},
		     {name : 'order-list',desc : '我的订单',href : './order-list.html'},
		     {name : 'user-pass-update',desc : '修改密码',href : './pass-update.html'},
		     {name : 'about',desc : '关于MMall',href : './about.html'}
		]
	},
	init : function(option){
		//合并选项
		$.extend(this.option,option);
		this.renderNav();
	},
	//渲染导航菜单
	renderNav : function(){
		 for (var i = 0,iLength = this.option.navList.length; i < iLength;i++) {
		 	if(this.option.navList[i].name === this.option.name){
		 		this.option.navList[i].isActive = true;
		 	}
		 };
		 //渲染list数据
		 var navHtml = _mm.renderHtml(templateIndex,{
		 	 navList : this.option.navList
		 });
		 //把html放入容器
		 console.log(navHtml);
		 $('.nav-side').html(navHtml);
	}
};

//模块输出的时候初始化一下nav对象
module.exports = navSide;
