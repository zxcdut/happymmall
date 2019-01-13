/*
 * @autor：xiangzi
 * @Date: 2019-1-12  17：16
 * @Last modified time : 2019-1-12  17：16
 */


'use strict'
// require('util/mm.js')就表示引入util/mm.js了，
//但为什么还要有个var _mm呢？就是因为便于后续使用里面的方法呀！
var _mm = require('util/mm.js');
require('./index.css');

var html = '<div>{{data}}</div>';
var data = {
	data : "testc"
};
console.log(_mm.renderHtml(html,data));
