/*
 * @autor：xiangzi
 * @Date: 2019-1-19  01：03
 * @Last modified time : 2019-1-19  01：03
 * 
 */


'use strict'
require('./index.css');
require('page/common/nav-simple/index.js');
var _mm = require('util/mm.js');

$(function(){
	var type     = _mm.getUrlParam('type') || 'default';
	var $element = $('.' + type + '-success');
	//显示对应元素
	$element.show();
})