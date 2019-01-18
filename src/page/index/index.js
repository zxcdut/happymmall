/*
 * @autor：xiangzi
 * @Date: 2019-1-12  17：16
 * @Last modified time : 2019-1-12  17：16
 */


'use strict'

require('./index.css');
//引用common中nav-simple下的index.js
require('page/common/nav-simple/index.js');
//引用common中nav下的index.js
require('page/common/nav/index.js');
//引用common中header下的index.js
require('page/common/header/index.js');
//引用common中nav-side下的index.js
var navSide = require('page/common/nav-side/index.js');
// require('util/mm.js')就表示引入util/mm.js了，
//但为什么还要有个var _mm呢？就是因为便于后续使用里面的方法呀！
var _mm = require('util/mm.js');

navSide.init({
	name : 'order-list'
});


