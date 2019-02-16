/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/dist/";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 69);
/******/ })
/************************************************************************/
/******/ ({

/***/ 0:
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/*
 * @autor：xiangzi
 * @Date: 2019-1-13  12：22
 * @Last modified time : 2019-1-13  12：22
 */



var Hogan = __webpack_require__(2);
var conf = {
	serverHost : ''
};
//定义一个_mm对象
var _mm = {
	// 网络请求
	request : function(param){
		//为了在这个request函数内容能调用到doLogin函数，需要先引用_mm对象。
		var _this = this;
		$.ajax({
			type        : param.method || "get",
			url         : param.url    || "",
			dataType    : param.type   || "json",
			data        : param.data   || "",
			success     : function(res){
				// 请求成功，会返回res对象。
				if(0 === res.status){
					typeof param.success === 'function' && param.success(res.data,res.msg);
				}
				// 没有登录状态，需要强制登录
				else if(10 === res.status){
					_this.doLogin();
				}
				//请求数据错误
				else if(1 === res.status){
					typeof param.error === 'function' && param.error(res.msg)
				}
			},
			error       : function(err){
				typeof param.error === 'function' && param.error(error.statusText);
			}
		});
	},
	// 获取服务器地址
	getServerUrl : function(path){
		return conf.serverHost + path;
	},
	// 获取url中的参数
	getUrlParam  : function(name){
		var reg      = new RegExp('(^|&)' + name + '=([^&]*)(&|$)');
		var result   = window.location.search.substr(1).match(reg);
		return result ? decodeURIComponent(result[2]) : null;
	},
	// 渲染html模板，传入模板和数据，方法体是将模板和数据进行拼接后生成html文档
	renderHtml : function(htmlTemplate,data){
		// 先编译html模板
		var template    = Hogan.compile(htmlTemplate);
		// 渲染模板
		var result      = template.render(data);
		return result;
	},	
	// 成功提示
	successTips : function(msg){
		alert(msg || '操作成功！');
	},
	// 错误提示
	errorTips : function(msg){
		alert(msg || '哪里不对了');
	},
	// 字段的验证，支持非空、手机、邮箱的判断
	validate : function(value,type){
		var value = $.trim(value);
		//非空验证,当value为空时，返回false;当value有值时，返回ture。
		if('required' === type){
			return !!value;
		}
		// 手机号验证
		if('phone' === type){
			return /^1\d{10}$/.test(value);
		}
		// 邮箱格式验证
		if('email' === type){
			return /^(\w)+(\.\w+)*@(\w)+((\.\w{2,3}){1,3})$/.test(value);
		}
	},
	// 统一登录处理
	doLogin : function(){
		//跳转至登录页面，且url参数中传递当前页面路径，登录成功后回到当前页面。
		window.location.href = './user-login.html?redirect=' + encodeURIComponent(window.location.href);
	},
	// 回到主页
	goHome : function(){
		window.location.href = './index.html';
	}
}; 
//将_mm对象向外输出
module.exports = _mm;


/***/ }),

/***/ 1:
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/*
 * @autor：xiangzi
 * @Date: 2019-1-14  23：32
 * @Last modified time : 2019-1-14  23：32
 */




var _mm   = __webpack_require__(0);

var _user = {
	// 用户登录
	login : function(userInfo,resolve,reject){
		_mm.request({
			url      : _mm.getServerUrl('/user/login.do'),
			data     : userInfo,
			method   : 'POST',
			success  : resolve,
			error    : reject
		});
	},
	// 用户注册
	register : function(userInfo,resolve,reject){
		_mm.request({
			url      : _mm.getServerUrl('/user/register.do'),
			data     : userInfo,
			method   : 'POST',
			success  : resolve,
			error    : reject
		});
	},
	// 用户名验证
	checkUsername : function(username,resolve,reject){
		_mm.request({
			url      : _mm.getServerUrl('/user/check_valid.do'),
			data     : {
				type     :   'username',
				str      :  username
			},
			method   : 'POST',
			success  : resolve,
			error    : reject
		});
	},
	//检查登录状态
	checkLogin : function(resolve,reject){
		_mm.request({
			url      : _mm.getServerUrl('/user/get_user_info.do'),
			method   : 'POST',
			success  : resolve,
			error    : reject
		});
	},
	// 获取用户密码提示问题
	getQuestion : function(username,resolve,reject){
		_mm.request({
			url      : _mm.getServerUrl('/user/forget_get_question.do'),
			data     : {
				username : username
			},
			method   : 'POST',
			success  : resolve,
			error    : reject
		});
	},
	//检查密码提示问题的答案
	checkAnswer : function(userInfo,resolve,reject){
		_mm.request({
			url      : _mm.getServerUrl('/user/forget_check_answer.do'),
			data     : userInfo,
			method   : 'POST',
			success  : resolve,
			error    : reject
		});
	},
	//重置密码
	resetPassword : function(userInfo,resolve,reject){
		_mm.request({
			url      : _mm.getServerUrl('/user/forget_reset_password.do'),
			data     : userInfo,
			method   : 'POST',
			success  : resolve,
			error    : reject
		});
	},
	// 获取用户信息
	getUserInfo :　function(resolve,reject){
		_mm.request({
			url      : _mm.getServerUrl('/user/get_information.do'),
			method   : 'POST',
			success  : resolve,
			error    : reject
		});
	},
	// 更新个人信息
	updateUserInfo : function(userInfo,resolve,reject){
		_mm.request({
			url      : _mm.getServerUrl('/user/update_information.do'),
			data     : userInfo,
			method   : 'POST',
			success  : resolve,
			error    : reject
		});
	},
    // 登录状态下更新密码
	updatePassword : function(userInfo,resolve,reject){
		_mm.request({
			url      : _mm.getServerUrl('/user/reset_password.do'),
			data     : userInfo,
			method   : 'POST',
			success  : resolve,
			error    : reject
		});
	},
	// 这个function(resolve,reject) 是个啥意思啊？
	logout : function(resolve,reject){
		_mm.request({
			url      : _mm.getServerUrl('/user/logout.do'),
			method   : 'POST',
			success  : resolve,
			error    : reject
		});
	}
}
module.exports = _user;

/***/ }),

/***/ 15:
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/*
 * @autor：xiangzi
 * @Date: 2019-02-13  22：13
 * @Last modified time : 2019-02-13  22：13
 */




var _mm   = __webpack_require__(0);

var _order = {
	// 获取商品列表
	getProductList : function(resolve,reject){
		_mm.request({
			url      : _mm.getServerUrl('/order/get_order_cart_product.do'),
			method   : 'POST',
			success  : resolve,
			error    : reject
		});
	},
	// 创建订单
	createOrder : function(orderInfo,resolve,reject){
		_mm.request({
			url      : _mm.getServerUrl('/order/create.do'),
			data     : orderInfo,
			method   : 'POST',
			success  : resolve,
			error    : reject
		});
	},
	// 获取订单列表
	getOrderList : function(listParam,resolve,reject){
		_mm.request({
			url      : _mm.getServerUrl('/order/list.do'),
			data     : listParam,
			method   : 'POST',
			success  : resolve,
			error    : reject
		});
	},
	// 获取订单详情
	getOrderDetail : function(orderNumber,resolve,reject){
		_mm.request({
			url      : _mm.getServerUrl('/order/detail.do'),
			data     : {
			   orderNo : orderNumber	
			},
			method   : 'POST',
			success  : resolve,
			error    : reject
		});
	},
	// 取消订单接口
	cancelOrder : function(orderNumber,resolve,reject){
		_mm.request({
			url      : _mm.getServerUrl('/order/cancel.do'),
			data     : {
			   orderNo : orderNumber	
			},
			method   : 'POST',
			success  : resolve,
			error    : reject
		});
	}
};
module.exports = _order;

/***/ }),

/***/ 2:
/***/ (function(module, exports, __webpack_require__) {

/*
 *  Copyright 2011 Twitter, Inc.
 *  Licensed under the Apache License, Version 2.0 (the "License");
 *  you may not use this file except in compliance with the License.
 *  You may obtain a copy of the License at
 *
 *  http://www.apache.org/licenses/LICENSE-2.0
 *
 *  Unless required by applicable law or agreed to in writing, software
 *  distributed under the License is distributed on an "AS IS" BASIS,
 *  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *  See the License for the specific language governing permissions and
 *  limitations under the License.
 */

// This file is for use with Node.js. See dist/ for browser files.

var Hogan = __webpack_require__(3);
Hogan.Template = __webpack_require__(4).Template;
Hogan.template = Hogan.Template;
module.exports = Hogan;


/***/ }),

/***/ 22:
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/*
 * @autor：xiangzi
 * @Date: 2019-02-14  01：13
 * @Last modified time : 2019-02-14  01：13
 */




var _mm   = __webpack_require__(0);

var _address = {
	// 获取地址列表
	getAddressList : function(resolve,reject){
		_mm.request({
			url      : _mm.getServerUrl('/shipping/list.do'),
			data     : {
				pageSize : 50
			},
			method   : 'POST',
			success  : resolve,
			error    : reject
		});
	},
	// 新建收件人
	save : function(addressInfo,resolve,reject){
		_mm.request({
			url      : _mm.getServerUrl('/shipping/add.do'),
			data     : addressInfo,
			method   : 'POST',
			success  : resolve,
			error    : reject
		});
	},
	// 更新收件人
	update : function(addressInfo,resolve,reject){
		_mm.request({
			url      : _mm.getServerUrl('/shipping/update.do'),
			data     : addressInfo,
			method   : 'POST',
			success  : resolve,
			error    : reject
		});
	},
	// 删除收件人
	deleteAddress : function(shippingId,resolve,reject){
		_mm.request({
			url      : _mm.getServerUrl('/shipping/del.do'),
			data     : {
				shippingId  : shippingId
			},
			method   : 'POST',
			success  : resolve,
			error    : reject
		});
	},
	// 获取单条收件人信息
	getAddress : function(shippingId,resolve,reject){
		_mm.request({
			url      : _mm.getServerUrl('/shipping/select.do'),
			data     : {
				shippingId  : shippingId
			},
			method   : 'POST',
			success  : resolve,
			error    : reject
		});
	}
};
module.exports = _address;

/***/ }),

/***/ 3:
/***/ (function(module, exports, __webpack_require__) {

/*
 *  Copyright 2011 Twitter, Inc.
 *  Licensed under the Apache License, Version 2.0 (the "License");
 *  you may not use this file except in compliance with the License.
 *  You may obtain a copy of the License at
 *
 *  http://www.apache.org/licenses/LICENSE-2.0
 *
 *  Unless required by applicable law or agreed to in writing, software
 *  distributed under the License is distributed on an "AS IS" BASIS,
 *  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *  See the License for the specific language governing permissions and
 *  limitations under the License.
 */

(function (Hogan) {
  // Setup regex  assignments
  // remove whitespace according to Mustache spec
  var rIsWhitespace = /\S/,
      rQuot = /\"/g,
      rNewline =  /\n/g,
      rCr = /\r/g,
      rSlash = /\\/g,
      rLineSep = /\u2028/,
      rParagraphSep = /\u2029/;

  Hogan.tags = {
    '#': 1, '^': 2, '<': 3, '$': 4,
    '/': 5, '!': 6, '>': 7, '=': 8, '_v': 9,
    '{': 10, '&': 11, '_t': 12
  };

  Hogan.scan = function scan(text, delimiters) {
    var len = text.length,
        IN_TEXT = 0,
        IN_TAG_TYPE = 1,
        IN_TAG = 2,
        state = IN_TEXT,
        tagType = null,
        tag = null,
        buf = '',
        tokens = [],
        seenTag = false,
        i = 0,
        lineStart = 0,
        otag = '{{',
        ctag = '}}';

    function addBuf() {
      if (buf.length > 0) {
        tokens.push({tag: '_t', text: new String(buf)});
        buf = '';
      }
    }

    function lineIsWhitespace() {
      var isAllWhitespace = true;
      for (var j = lineStart; j < tokens.length; j++) {
        isAllWhitespace =
          (Hogan.tags[tokens[j].tag] < Hogan.tags['_v']) ||
          (tokens[j].tag == '_t' && tokens[j].text.match(rIsWhitespace) === null);
        if (!isAllWhitespace) {
          return false;
        }
      }

      return isAllWhitespace;
    }

    function filterLine(haveSeenTag, noNewLine) {
      addBuf();

      if (haveSeenTag && lineIsWhitespace()) {
        for (var j = lineStart, next; j < tokens.length; j++) {
          if (tokens[j].text) {
            if ((next = tokens[j+1]) && next.tag == '>') {
              // set indent to token value
              next.indent = tokens[j].text.toString()
            }
            tokens.splice(j, 1);
          }
        }
      } else if (!noNewLine) {
        tokens.push({tag:'\n'});
      }

      seenTag = false;
      lineStart = tokens.length;
    }

    function changeDelimiters(text, index) {
      var close = '=' + ctag,
          closeIndex = text.indexOf(close, index),
          delimiters = trim(
            text.substring(text.indexOf('=', index) + 1, closeIndex)
          ).split(' ');

      otag = delimiters[0];
      ctag = delimiters[delimiters.length - 1];

      return closeIndex + close.length - 1;
    }

    if (delimiters) {
      delimiters = delimiters.split(' ');
      otag = delimiters[0];
      ctag = delimiters[1];
    }

    for (i = 0; i < len; i++) {
      if (state == IN_TEXT) {
        if (tagChange(otag, text, i)) {
          --i;
          addBuf();
          state = IN_TAG_TYPE;
        } else {
          if (text.charAt(i) == '\n') {
            filterLine(seenTag);
          } else {
            buf += text.charAt(i);
          }
        }
      } else if (state == IN_TAG_TYPE) {
        i += otag.length - 1;
        tag = Hogan.tags[text.charAt(i + 1)];
        tagType = tag ? text.charAt(i + 1) : '_v';
        if (tagType == '=') {
          i = changeDelimiters(text, i);
          state = IN_TEXT;
        } else {
          if (tag) {
            i++;
          }
          state = IN_TAG;
        }
        seenTag = i;
      } else {
        if (tagChange(ctag, text, i)) {
          tokens.push({tag: tagType, n: trim(buf), otag: otag, ctag: ctag,
                       i: (tagType == '/') ? seenTag - otag.length : i + ctag.length});
          buf = '';
          i += ctag.length - 1;
          state = IN_TEXT;
          if (tagType == '{') {
            if (ctag == '}}') {
              i++;
            } else {
              cleanTripleStache(tokens[tokens.length - 1]);
            }
          }
        } else {
          buf += text.charAt(i);
        }
      }
    }

    filterLine(seenTag, true);

    return tokens;
  }

  function cleanTripleStache(token) {
    if (token.n.substr(token.n.length - 1) === '}') {
      token.n = token.n.substring(0, token.n.length - 1);
    }
  }

  function trim(s) {
    if (s.trim) {
      return s.trim();
    }

    return s.replace(/^\s*|\s*$/g, '');
  }

  function tagChange(tag, text, index) {
    if (text.charAt(index) != tag.charAt(0)) {
      return false;
    }

    for (var i = 1, l = tag.length; i < l; i++) {
      if (text.charAt(index + i) != tag.charAt(i)) {
        return false;
      }
    }

    return true;
  }

  // the tags allowed inside super templates
  var allowedInSuper = {'_t': true, '\n': true, '$': true, '/': true};

  function buildTree(tokens, kind, stack, customTags) {
    var instructions = [],
        opener = null,
        tail = null,
        token = null;

    tail = stack[stack.length - 1];

    while (tokens.length > 0) {
      token = tokens.shift();

      if (tail && tail.tag == '<' && !(token.tag in allowedInSuper)) {
        throw new Error('Illegal content in < super tag.');
      }

      if (Hogan.tags[token.tag] <= Hogan.tags['$'] || isOpener(token, customTags)) {
        stack.push(token);
        token.nodes = buildTree(tokens, token.tag, stack, customTags);
      } else if (token.tag == '/') {
        if (stack.length === 0) {
          throw new Error('Closing tag without opener: /' + token.n);
        }
        opener = stack.pop();
        if (token.n != opener.n && !isCloser(token.n, opener.n, customTags)) {
          throw new Error('Nesting error: ' + opener.n + ' vs. ' + token.n);
        }
        opener.end = token.i;
        return instructions;
      } else if (token.tag == '\n') {
        token.last = (tokens.length == 0) || (tokens[0].tag == '\n');
      }

      instructions.push(token);
    }

    if (stack.length > 0) {
      throw new Error('missing closing tag: ' + stack.pop().n);
    }

    return instructions;
  }

  function isOpener(token, tags) {
    for (var i = 0, l = tags.length; i < l; i++) {
      if (tags[i].o == token.n) {
        token.tag = '#';
        return true;
      }
    }
  }

  function isCloser(close, open, tags) {
    for (var i = 0, l = tags.length; i < l; i++) {
      if (tags[i].c == close && tags[i].o == open) {
        return true;
      }
    }
  }

  function stringifySubstitutions(obj) {
    var items = [];
    for (var key in obj) {
      items.push('"' + esc(key) + '": function(c,p,t,i) {' + obj[key] + '}');
    }
    return "{ " + items.join(",") + " }";
  }

  function stringifyPartials(codeObj) {
    var partials = [];
    for (var key in codeObj.partials) {
      partials.push('"' + esc(key) + '":{name:"' + esc(codeObj.partials[key].name) + '", ' + stringifyPartials(codeObj.partials[key]) + "}");
    }
    return "partials: {" + partials.join(",") + "}, subs: " + stringifySubstitutions(codeObj.subs);
  }

  Hogan.stringify = function(codeObj, text, options) {
    return "{code: function (c,p,i) { " + Hogan.wrapMain(codeObj.code) + " }," + stringifyPartials(codeObj) +  "}";
  }

  var serialNo = 0;
  Hogan.generate = function(tree, text, options) {
    serialNo = 0;
    var context = { code: '', subs: {}, partials: {} };
    Hogan.walk(tree, context);

    if (options.asString) {
      return this.stringify(context, text, options);
    }

    return this.makeTemplate(context, text, options);
  }

  Hogan.wrapMain = function(code) {
    return 'var t=this;t.b(i=i||"");' + code + 'return t.fl();';
  }

  Hogan.template = Hogan.Template;

  Hogan.makeTemplate = function(codeObj, text, options) {
    var template = this.makePartials(codeObj);
    template.code = new Function('c', 'p', 'i', this.wrapMain(codeObj.code));
    return new this.template(template, text, this, options);
  }

  Hogan.makePartials = function(codeObj) {
    var key, template = {subs: {}, partials: codeObj.partials, name: codeObj.name};
    for (key in template.partials) {
      template.partials[key] = this.makePartials(template.partials[key]);
    }
    for (key in codeObj.subs) {
      template.subs[key] = new Function('c', 'p', 't', 'i', codeObj.subs[key]);
    }
    return template;
  }

  function esc(s) {
    return s.replace(rSlash, '\\\\')
            .replace(rQuot, '\\\"')
            .replace(rNewline, '\\n')
            .replace(rCr, '\\r')
            .replace(rLineSep, '\\u2028')
            .replace(rParagraphSep, '\\u2029');
  }

  function chooseMethod(s) {
    return (~s.indexOf('.')) ? 'd' : 'f';
  }

  function createPartial(node, context) {
    var prefix = "<" + (context.prefix || "");
    var sym = prefix + node.n + serialNo++;
    context.partials[sym] = {name: node.n, partials: {}};
    context.code += 't.b(t.rp("' +  esc(sym) + '",c,p,"' + (node.indent || '') + '"));';
    return sym;
  }

  Hogan.codegen = {
    '#': function(node, context) {
      context.code += 'if(t.s(t.' + chooseMethod(node.n) + '("' + esc(node.n) + '",c,p,1),' +
                      'c,p,0,' + node.i + ',' + node.end + ',"' + node.otag + " " + node.ctag + '")){' +
                      't.rs(c,p,' + 'function(c,p,t){';
      Hogan.walk(node.nodes, context);
      context.code += '});c.pop();}';
    },

    '^': function(node, context) {
      context.code += 'if(!t.s(t.' + chooseMethod(node.n) + '("' + esc(node.n) + '",c,p,1),c,p,1,0,0,"")){';
      Hogan.walk(node.nodes, context);
      context.code += '};';
    },

    '>': createPartial,
    '<': function(node, context) {
      var ctx = {partials: {}, code: '', subs: {}, inPartial: true};
      Hogan.walk(node.nodes, ctx);
      var template = context.partials[createPartial(node, context)];
      template.subs = ctx.subs;
      template.partials = ctx.partials;
    },

    '$': function(node, context) {
      var ctx = {subs: {}, code: '', partials: context.partials, prefix: node.n};
      Hogan.walk(node.nodes, ctx);
      context.subs[node.n] = ctx.code;
      if (!context.inPartial) {
        context.code += 't.sub("' + esc(node.n) + '",c,p,i);';
      }
    },

    '\n': function(node, context) {
      context.code += write('"\\n"' + (node.last ? '' : ' + i'));
    },

    '_v': function(node, context) {
      context.code += 't.b(t.v(t.' + chooseMethod(node.n) + '("' + esc(node.n) + '",c,p,0)));';
    },

    '_t': function(node, context) {
      context.code += write('"' + esc(node.text) + '"');
    },

    '{': tripleStache,

    '&': tripleStache
  }

  function tripleStache(node, context) {
    context.code += 't.b(t.t(t.' + chooseMethod(node.n) + '("' + esc(node.n) + '",c,p,0)));';
  }

  function write(s) {
    return 't.b(' + s + ');';
  }

  Hogan.walk = function(nodelist, context) {
    var func;
    for (var i = 0, l = nodelist.length; i < l; i++) {
      func = Hogan.codegen[nodelist[i].tag];
      func && func(nodelist[i], context);
    }
    return context;
  }

  Hogan.parse = function(tokens, text, options) {
    options = options || {};
    return buildTree(tokens, '', [], options.sectionTags || []);
  }

  Hogan.cache = {};

  Hogan.cacheKey = function(text, options) {
    return [text, !!options.asString, !!options.disableLambda, options.delimiters, !!options.modelGet].join('||');
  }

  Hogan.compile = function(text, options) {
    options = options || {};
    var key = Hogan.cacheKey(text, options);
    var template = this.cache[key];

    if (template) {
      var partials = template.partials;
      for (var name in partials) {
        delete partials[name].instance;
      }
      return template;
    }

    template = this.generate(this.parse(this.scan(text, options.delimiters), text, options), text, options);
    return this.cache[key] = template;
  }
})( true ? exports : Hogan);


/***/ }),

/***/ 4:
/***/ (function(module, exports, __webpack_require__) {

/*
 *  Copyright 2011 Twitter, Inc.
 *  Licensed under the Apache License, Version 2.0 (the "License");
 *  you may not use this file except in compliance with the License.
 *  You may obtain a copy of the License at
 *
 *  http://www.apache.org/licenses/LICENSE-2.0
 *
 *  Unless required by applicable law or agreed to in writing, software
 *  distributed under the License is distributed on an "AS IS" BASIS,
 *  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *  See the License for the specific language governing permissions and
 *  limitations under the License.
 */

var Hogan = {};

(function (Hogan) {
  Hogan.Template = function (codeObj, text, compiler, options) {
    codeObj = codeObj || {};
    this.r = codeObj.code || this.r;
    this.c = compiler;
    this.options = options || {};
    this.text = text || '';
    this.partials = codeObj.partials || {};
    this.subs = codeObj.subs || {};
    this.buf = '';
  }

  Hogan.Template.prototype = {
    // render: replaced by generated code.
    r: function (context, partials, indent) { return ''; },

    // variable escaping
    v: hoganEscape,

    // triple stache
    t: coerceToString,

    render: function render(context, partials, indent) {
      return this.ri([context], partials || {}, indent);
    },

    // render internal -- a hook for overrides that catches partials too
    ri: function (context, partials, indent) {
      return this.r(context, partials, indent);
    },

    // ensurePartial
    ep: function(symbol, partials) {
      var partial = this.partials[symbol];

      // check to see that if we've instantiated this partial before
      var template = partials[partial.name];
      if (partial.instance && partial.base == template) {
        return partial.instance;
      }

      if (typeof template == 'string') {
        if (!this.c) {
          throw new Error("No compiler available.");
        }
        template = this.c.compile(template, this.options);
      }

      if (!template) {
        return null;
      }

      // We use this to check whether the partials dictionary has changed
      this.partials[symbol].base = template;

      if (partial.subs) {
        // Make sure we consider parent template now
        if (!partials.stackText) partials.stackText = {};
        for (key in partial.subs) {
          if (!partials.stackText[key]) {
            partials.stackText[key] = (this.activeSub !== undefined && partials.stackText[this.activeSub]) ? partials.stackText[this.activeSub] : this.text;
          }
        }
        template = createSpecializedPartial(template, partial.subs, partial.partials,
          this.stackSubs, this.stackPartials, partials.stackText);
      }
      this.partials[symbol].instance = template;

      return template;
    },

    // tries to find a partial in the current scope and render it
    rp: function(symbol, context, partials, indent) {
      var partial = this.ep(symbol, partials);
      if (!partial) {
        return '';
      }

      return partial.ri(context, partials, indent);
    },

    // render a section
    rs: function(context, partials, section) {
      var tail = context[context.length - 1];

      if (!isArray(tail)) {
        section(context, partials, this);
        return;
      }

      for (var i = 0; i < tail.length; i++) {
        context.push(tail[i]);
        section(context, partials, this);
        context.pop();
      }
    },

    // maybe start a section
    s: function(val, ctx, partials, inverted, start, end, tags) {
      var pass;

      if (isArray(val) && val.length === 0) {
        return false;
      }

      if (typeof val == 'function') {
        val = this.ms(val, ctx, partials, inverted, start, end, tags);
      }

      pass = !!val;

      if (!inverted && pass && ctx) {
        ctx.push((typeof val == 'object') ? val : ctx[ctx.length - 1]);
      }

      return pass;
    },

    // find values with dotted names
    d: function(key, ctx, partials, returnFound) {
      var found,
          names = key.split('.'),
          val = this.f(names[0], ctx, partials, returnFound),
          doModelGet = this.options.modelGet,
          cx = null;

      if (key === '.' && isArray(ctx[ctx.length - 2])) {
        val = ctx[ctx.length - 1];
      } else {
        for (var i = 1; i < names.length; i++) {
          found = findInScope(names[i], val, doModelGet);
          if (found !== undefined) {
            cx = val;
            val = found;
          } else {
            val = '';
          }
        }
      }

      if (returnFound && !val) {
        return false;
      }

      if (!returnFound && typeof val == 'function') {
        ctx.push(cx);
        val = this.mv(val, ctx, partials);
        ctx.pop();
      }

      return val;
    },

    // find values with normal names
    f: function(key, ctx, partials, returnFound) {
      var val = false,
          v = null,
          found = false,
          doModelGet = this.options.modelGet;

      for (var i = ctx.length - 1; i >= 0; i--) {
        v = ctx[i];
        val = findInScope(key, v, doModelGet);
        if (val !== undefined) {
          found = true;
          break;
        }
      }

      if (!found) {
        return (returnFound) ? false : "";
      }

      if (!returnFound && typeof val == 'function') {
        val = this.mv(val, ctx, partials);
      }

      return val;
    },

    // higher order templates
    ls: function(func, cx, partials, text, tags) {
      var oldTags = this.options.delimiters;

      this.options.delimiters = tags;
      this.b(this.ct(coerceToString(func.call(cx, text)), cx, partials));
      this.options.delimiters = oldTags;

      return false;
    },

    // compile text
    ct: function(text, cx, partials) {
      if (this.options.disableLambda) {
        throw new Error('Lambda features disabled.');
      }
      return this.c.compile(text, this.options).render(cx, partials);
    },

    // template result buffering
    b: function(s) { this.buf += s; },

    fl: function() { var r = this.buf; this.buf = ''; return r; },

    // method replace section
    ms: function(func, ctx, partials, inverted, start, end, tags) {
      var textSource,
          cx = ctx[ctx.length - 1],
          result = func.call(cx);

      if (typeof result == 'function') {
        if (inverted) {
          return true;
        } else {
          textSource = (this.activeSub && this.subsText && this.subsText[this.activeSub]) ? this.subsText[this.activeSub] : this.text;
          return this.ls(result, cx, partials, textSource.substring(start, end), tags);
        }
      }

      return result;
    },

    // method replace variable
    mv: function(func, ctx, partials) {
      var cx = ctx[ctx.length - 1];
      var result = func.call(cx);

      if (typeof result == 'function') {
        return this.ct(coerceToString(result.call(cx)), cx, partials);
      }

      return result;
    },

    sub: function(name, context, partials, indent) {
      var f = this.subs[name];
      if (f) {
        this.activeSub = name;
        f(context, partials, this, indent);
        this.activeSub = false;
      }
    }

  };

  //Find a key in an object
  function findInScope(key, scope, doModelGet) {
    var val;

    if (scope && typeof scope == 'object') {

      if (scope[key] !== undefined) {
        val = scope[key];

      // try lookup with get for backbone or similar model data
      } else if (doModelGet && scope.get && typeof scope.get == 'function') {
        val = scope.get(key);
      }
    }

    return val;
  }

  function createSpecializedPartial(instance, subs, partials, stackSubs, stackPartials, stackText) {
    function PartialTemplate() {};
    PartialTemplate.prototype = instance;
    function Substitutions() {};
    Substitutions.prototype = instance.subs;
    var key;
    var partial = new PartialTemplate();
    partial.subs = new Substitutions();
    partial.subsText = {};  //hehe. substext.
    partial.buf = '';

    stackSubs = stackSubs || {};
    partial.stackSubs = stackSubs;
    partial.subsText = stackText;
    for (key in subs) {
      if (!stackSubs[key]) stackSubs[key] = subs[key];
    }
    for (key in stackSubs) {
      partial.subs[key] = stackSubs[key];
    }

    stackPartials = stackPartials || {};
    partial.stackPartials = stackPartials;
    for (key in partials) {
      if (!stackPartials[key]) stackPartials[key] = partials[key];
    }
    for (key in stackPartials) {
      partial.partials[key] = stackPartials[key];
    }

    return partial;
  }

  var rAmp = /&/g,
      rLt = /</g,
      rGt = />/g,
      rApos = /\'/g,
      rQuot = /\"/g,
      hChars = /[&<>\"\']/;

  function coerceToString(val) {
    return String((val === null || val === undefined) ? '' : val);
  }

  function hoganEscape(str) {
    str = coerceToString(str);
    return hChars.test(str) ?
      str
        .replace(rAmp, '&amp;')
        .replace(rLt, '&lt;')
        .replace(rGt, '&gt;')
        .replace(rApos, '&#39;')
        .replace(rQuot, '&quot;') :
      str;
  }

  var isArray = Array.isArray || function(a) {
    return Object.prototype.toString.call(a) === '[object Array]';
  };

})( true ? exports : Hogan);


/***/ }),

/***/ 5:
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/*
 * @autor：xiangzi
 * @Date: 2019-1-15  09：24
 * @Last modified time : 2019-1-15  09：24
 */




var _mm   = __webpack_require__(0);

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

/***/ }),

/***/ 6:
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/*
 * @autor：xiangzi
 * @Date: 2019-1-14  23：32
 * @Last modified time : 2019-1-14  23：32
 */



__webpack_require__(7);
var _mm   = __webpack_require__(0);
var _user = __webpack_require__(1);
var _cart = __webpack_require__(5);
var nav   = {
	init         : function(){
		this.bindEvent();
		this.loadUserInfo();
		this.loadCartCount();
		//很关键的一步，这样输出的时候才是nav对象本身
		return this;      
	},
	bindEvent    : function(){
		// 登录点击事件
		$('.js-login').click(function(){
			_mm.doLogin();
		});
		// 注册点击事件
		$('.js-register').click(function(){
			window.location.href = './user-register.html' 
		});
		// 退出点击事件
		$('.js-logout').click(function(){
			_user.logout(function(res){
				window.location.reload();
			},function(errMsg){
				_mm.errorTips(errMsg);
			});
		});
	},
	//加载用户信息
	loadUserInfo : function(){
		_user.checkLogin(function(res){
				$('.user.not-login').hide().siblings('.user.login').show()
				     .find('.username').text(res.username);
			},function(errMsg){
				
		});
	},
	//加载购物车数量
	loadCartCount : function(){
		_cart.getCartCount(function(res){
			$('.nav .cart-count').text(res || 0);
		},function(errMsg){
			$('.nav .cart-count').text(0);
		});
	}
};
//模块输出的时候初始化一下nav对象
module.exports = nav.init();


/***/ }),

/***/ 69:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(70);


/***/ }),

/***/ 7:
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),

/***/ 70:
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/*
 * @autor：xiangzi
 * @Date: 2019-02-07  19：53
 * @Last modified time : 2019-02-07  19：53
 */


__webpack_require__(71);
__webpack_require__(8);
__webpack_require__(6);
var _mm             = __webpack_require__(0);
var _order          = __webpack_require__(15);
var _address        = __webpack_require__(22);
var templateAddress = __webpack_require__(72);
var templateProduct = __webpack_require__(73);
var addressModal    = __webpack_require__(74);

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

/***/ }),

/***/ 71:
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),

/***/ 72:
/***/ (function(module, exports) {

module.exports = "{{#list}}\r\n{{#isActive}}\r\n<div class=\"address-item active\" data-id={{id}}>\r\n{{/isActive}}\r\n{{^isActive}}\r\n<div class=\"address-item\" data-id={{id}}>\r\n{{/isActive}}\r\n\t<div class=\"address-title\">\r\n\t{{receiverCity}}  {{receiverProvince}}  （ {{receiverName}} 收 ）\r\n    </div>\r\n    <div class=\"address-detail\">\r\n\t{{receiverAddress}}  {{receiverPhone}}\r\n    </div>\r\n    <div class=\"address-opera\">\r\n\t    <span class=\"link address-update\">编辑</span>\r\n\t    <span class=\"link address-delete\">删除</span>\r\n    </div>\r\n</div>\r\n{{/list}}\r\n<div class=\"address-add\">\r\n    <div class=\"address-new\">\r\n        <i class=\"fa fa-plus\"></i>\r\n        <div class=\"text\">使用新地址</div>\r\n    </div>\r\n</div>\r\n";

/***/ }),

/***/ 73:
/***/ (function(module, exports) {

module.exports = "<table class=\"product-table\">\r\n\t<tr>\r\n\t\t<th class=\"cell-img\">&nbsp;</th>\r\n\t\t<th class=\"cell-info\">商品描述</th>\r\n\t\t<th class=\"cell-price\">价格</th>\r\n\t\t<th class=\"cell-count\">数量</th>\r\n\t\t<th class=\"cell-total\">小计</th>\r\n\t</tr>\r\n\t{{#orderItemVoList}}\r\n\t<tr>\r\n\t\t<td class=\"cell-img\">\r\n\t\t\t<a href=\"./detail.html?productId={{productId}}\">\r\n\t\t\t\t<img src=\"{{imageHost}}{{productImage}}\" alt=\"{{productName}}\" />\r\n\t\t\t</a>\r\n\t\t</td>\r\n\t\t<td class=\"cell-info\">\r\n\t\t\t<a class=\"link\" href=\"./detail.html?productId={{productId}}\">\r\n\t\t\t\t{{productName}}\r\n\t\t\t</a>\r\n\t\t</td>\r\n\t\t<td class=\"cell-price\">\r\n\t\t\t￥{{currentUnitPrice}}\r\n\t\t</td>\r\n\t\t<td class=\"cell-count\">\r\n\t\t\t{{quantity}}\r\n\t\t</td>\r\n\t\t<td class=\"cell-total\">\r\n\t\t\t￥{{totalPrice}}\r\n\t\t</td>\r\n\t</tr>\r\n\t{{/orderItemVoList}}\t\t\t\r\n</table>\r\n<div class=\"submit-con\">\r\n\t<span>订单总价:</span>\r\n\t<span class=\"submit-total\">￥{{productTotalPrice}}</span>\r\n\t<span class=\"btn order-submit\">提交订单</span>\r\n</div>";

/***/ }),

/***/ 74:
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/*
 * @autor：xiangzi
 * @Date: 2019-02-14  22：46
 * @Last modified time : 2019-02-14  22：46
 */


var _mm                  = __webpack_require__(0);
var _cities              = __webpack_require__(75);
var _address             = __webpack_require__(22);
var templateAddressModal = __webpack_require__(76);

var addressModal = {
    show : function(option){
    	// option的绑定，把show中的option信息绑定到addressModal对象上去，这样其它的函数也可以访问option信息了
    	this.option      = option;
    	this.option.data = option.data || {};
    	this.$modalWrap  = $('.modal-wrap');
    	//渲染页面
    	this.loadModal();
    	//绑定事件
    	this.bindEvent();
    },
    bindEvent : function(){
    	var _this = this;
    	// 省份和城市的二级联动
    	this.$modalWrap.find('#receiver-province').change(function(){
    		var selectedProvince = $(this).val();
    		_this.loadCities(selectedProvince);
    	});
    	// 提交收货地址
    	this.$modalWrap.find('.address-btn').click(function(){
    		//创建一个表单对象，用于提交给后台
    		var receiverInfo = _this.getReceiverInfo();
    		var isUpdate     = _this.option.isUpdate;
    		// 使用新地址，且验证通过
    		if(!isUpdate && receiverInfo.status){
    			_address.save(receiverInfo.data,function(res){
    				_mm.successTips('地址添加成功');
    				_this.hide();
    				// 这行代码是什么意思？
    				typeof _this.option.onSuccess === 'function' && _this.option.onSuccess(res);
    			},function(errMsg){
    				_mm.errorTips(errMsg);
    			});
    		}
    		// 更新收件人，并且验证通过
    		else if(isUpdate && receiverInfo.status){
    			_address.update(receiverInfo.data,function(res){
    				_mm.successTips('地址修改成功');
    				_this.hide();
    				typeof _this.option.onSuccess === 'function' && _this.option.onSuccess(res);
    			},function(errMsg){
    				_mm.errorTips(errMsg);
    			});
    		}
    		// 更新收件人，并且验证通过
    		else if(isUpdate && receiverInfo.status){
    			
    		}
    		// 验证不通过
    		else{
    			_mm.errorTips(receiverInfo.errMsg || '好像哪里不对了~');
    		}
    	});
    	// 保证点击modal内容区的时候，不关闭弹窗
    	this.$modalWrap.find('.modal-container').click(function(e){
    		e.stopPropagation();
    	});
    	// 点击×号或者蒙版区域，关闭弹窗
    	this.$modalWrap.find('.close').click(function(e){
    		_this.hide();
    	});
    },
    loadModal : function(){
    	var addressModalHtml = _mm.renderHtml(templateAddressModal,{
    		isUpdate   :  this.option.isUpdate,
    		data       :  this.option.data
    	});
    	this.$modalWrap.html(addressModalHtml);
    	//加载省份
    	this.loadProvince();
    },
    // 加载省份信息
    loadProvince : function(){
    	var provinces         =  _cities.getProvinces() || [];
    	var $provinceSelect   =  this.$modalWrap.find('#receiver-province');
    	$provinceSelect.html(this.getSelectOption(provinces));
    	// 如果是更新地址，并且有省份信息，做省份信息的回填
    	if(this.option.isUpdate && this.option.data.receiverProvince){
    		$provinceSelect.val(this.option.data.receiverProvince);
    		this.loadCities(this.option.data.receiverProvince);
    	}
    },
    //加载城市信息
    loadCities : function(provinceName){
    	var cities      = _cities.getCities(provinceName) || [];
    	var $citySelect = this.$modalWrap.find('#receiver-city');
    	$citySelect.html(this.getSelectOption(cities));
    	// 如果是更新地址，并且有城市信息，做城市信息的回填
    	if(this.option.isUpdate && this.option.data.receiverCity){
    		$citySelect.val(this.option.data.receiverCity);
    	}
    },
    // 获取表单里收件人信息，并做表单的验证
    getReceiverInfo : function(){
    	var receiverInfo  = {};
    	var result        = {
    		status : false
    	};
    	receiverInfo.receiverName     = $.trim(this.$modalWrap.find('#receiver-name').val());
    	receiverInfo.receiverProvince = this.$modalWrap.find('#receiver-province').val();
    	receiverInfo.receiverCity     = this.$modalWrap.find('#receiver-city').val();
    	receiverInfo.receiverPhone    = $.trim(this.$modalWrap.find('#receiver-phone').val());
    	receiverInfo.receiverAddress  = $.trim(this.$modalWrap.find('#receiver-address').val());
    	receiverInfo.receiverZip      = $.trim(this.$modalWrap.find('#receiver-zip').val());
    	if(this.option.isUpdate){
    		receiverInfo.id           = this.$modalWrap.find('#receiver-id').val();
    	}
    	// 表单验证
    	if(!receiverInfo.receiverName){
    		result.errMsg = '请输入收件人姓名';
    	}
    	else if(!receiverInfo.receiverProvince){
    		result.errMsg = '请选择省份';
    	}
    	else if(!receiverInfo.receiverCity){
    		result.errMsg = '请选择城市';
    	}
    	else if(!receiverInfo.receiverPhone){
    		result.errMsg = '请输入收件人手机号';
    	}
    	else if(!receiverInfo.receiverAddress){
    		result.errMsg = '请输入收件人详细地址';
    	}
    	// 所有验证都通过了
    	else{
    		result.status = true;
    		result.data   = receiverInfo;
    	}
    	return result;
    },
    //获取select框的选项，输入：array，输出HTML
    getSelectOption : function(optionArrary){
    	var html = '<option>请选择</option>';
    	for (var i = 0,length = optionArrary.length; i<length;i++) {
    		html += '<option value="' + optionArrary[i] + '">' + optionArrary[i] + '</option>';
    	}
    	return html;
    },
    // 关闭弹窗
    hide : function(){
    	this.$modalWrap.empty();
    }
};
module.exports = addressModal;



/***/ }),

/***/ 75:
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/*
 * @autor：xiangzi
 * @Date: 2019-2-14  23：11
 * @Last modified time : 2019-2-14  23：11
 */




var _cities = {
	cityInfo : {
		'北京':['北京'],
        '上海':['上海'],
        '天津':['天津'],
        '重庆':['重庆'],
        '河北省':['石家庄','张家口','承德','秦皇岛','唐山','廊坊','保定','沧州','衡水','邢台','邯郸'],
        '山西省':['太原','大同','朔州','阳泉','长治','晋城','忻州','吕梁','晋中','临汾','运城'],
        '辽宁省':['沈阳','朝阳','阜新','铁岭','抚顺','本溪','辽阳','鞍山','丹东','大连','营口','盘锦','锦州','葫芦岛'],
        '吉林省':['长春','白城','松原','吉林','四平','辽源','通化','白山','延边'],
        '黑龙江省':['哈尔滨','齐齐哈尔','黑河','大庆','伊春','鹤岗','佳木斯','双鸭山','七台河','鸡西','牡丹江','绥化','大兴安'],
        '江苏省':['南京','徐州','连云港','宿迁','淮阴','盐城','扬州','泰州','南通','镇江','常州','无锡','苏州'],
        '浙江省':['杭州','湖州','嘉兴','舟山','宁波','绍兴','金华','台州','温州','丽水'],
        '安徽省':['合肥','宿州','淮北','阜阳','蚌埠','淮南','滁州','马鞍山','芜湖','铜陵','安庆','黄山','六安','巢湖','池州','宣城'],
        '福建省':['福州','南平','三明','莆田','泉州','厦门','漳州','龙岩','宁德'],
        '江西省':['南昌','九江','景德镇','鹰潭','新余','萍乡','赣州','上饶','抚州','宜春','吉安'],
        '山东省':['济南','聊城','德州','东营','淄博','潍坊','烟台','威海','青岛','日照','临沂','枣庄','济宁','泰安','莱芜','滨州','菏泽'],
        '河南省':['郑州','三门峡','洛阳','焦作','新乡','鹤壁','安阳','濮阳','开封','商丘','许昌','漯河','平顶山','南阳','信阳','周口','驻马店'],
        '湖北省':['武汉','十堰','襄攀','荆门','孝感','黄冈','鄂州','黄石','咸宁','荆州','宜昌','恩施','襄樊'],
        '湖南省':['长沙','张家界','常德','益阳','岳阳','株洲','湘潭','衡阳','郴州','永州','邵阳','怀化','娄底','湘西'],
        '广东省':['广州','清远','韶关','河源','梅州','潮州','汕头','揭阳','汕尾','惠州','东莞','深圳','珠海','江门','佛山','肇庆','云浮','阳江','茂名','湛江'],
        '海南省':['海口','三亚'],
        '四川省':['成都','广元','绵阳','德阳','南充','广安','遂宁','内江','乐山','自贡','泸州','宜宾','攀枝花','巴中','达州','资阳','眉山','雅安','阿坝','甘孜','凉山'],
        '贵州省':['贵阳','六盘水','遵义','毕节','铜仁','安顺','黔东南','黔南','黔西南'],
        '云南省':['昆明','曲靖','玉溪','丽江','昭通','思茅','临沧','保山','德宏','怒江','迪庆','大理','楚雄','红河','文山','西双版纳'],
        '陕西省':['西安','延安','铜川','渭南','咸阳','宝鸡','汉中','榆林','商洛','安康'],
        '甘肃省':['兰州','嘉峪关','金昌','白银','天水','酒泉','张掖','武威','庆阳','平凉','定西','陇南','临夏','甘南'],
        '青海省':['西宁','海东','西宁','海北','海南','黄南','果洛','玉树','海西'],
        '内蒙古':['呼和浩特','包头','乌海','赤峰','呼伦贝尔盟','兴安盟','哲里木盟','锡林郭勒盟','乌兰察布盟','鄂尔多斯','巴彦淖尔盟','阿拉善盟'],
        '广西':['南宁','桂林','柳州','梧州','贵港','玉林','钦州','北海','防城港','南宁','百色','河池','柳州','贺州'],
        '西藏':['拉萨','那曲','昌都','林芝','山南','日喀则','阿里'],
        '宁夏':['银川','石嘴山','吴忠','固原'],
        '新疆':['乌鲁木齐','克拉玛依','喀什','阿克苏','和田','吐鲁番','哈密','博尔塔拉','昌吉','巴音郭楞','伊犁','塔城','阿勒泰'],
        '香港':['香港'],
        '澳门':['澳门'],
        '台湾':['台北','台南','其他']
	},
	// 获取所有的省份
	getProvinces : function(){
		var provinces = [];
		for (var item in this.cityInfo) {
			provinces.push(item);
		}
		return provinces;
	},
	//获取某省份的所有城市
	getCities : function(provinceName){
		return this.cityInfo[provinceName] || [];
	}
}

module.exports = _cities;

/***/ }),

/***/ 76:
/***/ (function(module, exports) {

module.exports = "<div class=\"modal close\">\r\n\t<div class=\"modal-container\">\r\n\t\t<div class=\"modal-header\">\r\n\t\t    {{#isUpdate}}\r\n\t\t    <h1 class=\"modal-title\">更新地址</h1>\r\n\t\t    {{/isUpdate}}\r\n\t\t\t{{^isUpdate}}\r\n\t\t    <h1 class=\"modal-title\">使用新地址</h1>\r\n\t\t    {{/isUpdate}}\r\n\t\t\t<i class=\"fa fa-close close\"></i>\r\n\t\t</div>\r\n\t\t<div class=\"modal-body\">\r\n\t\t\t<div class=\"form\">\r\n\t\t\t\t<div class=\"form-line\">\r\n\t\t\t\t\t<label class=\"label\" for=\"receiver-name\"><span class=\"required\">*</span>收件人姓名：</label>\r\n\t\t\t\t\t<input class=\"form-item\" id=\"receiver-name\" value=\"{{data.receiverName}}\" placeholder=\"请输入收件人姓名\" />\r\n\t\t\t\t</div>\r\n\t\t\t\t\r\n\t\t\t\t<div class=\"form-line\">\r\n\t\t\t\t\t<label class=\"label\" for=\"receiver-province\"><span class=\"required\">*</span>所在城市：</label>\r\n\t\t\t\t\t<select class=\"form-item\" id=\"receiver-province\">\r\n\t\t\t\t\t\t<option value=\"\">请选择</option>\r\n\t\t\t\t\t</select>\r\n\t\t\t\t\t<select class=\"form-item\" id=\"receiver-city\">\r\n\t\t\t\t\t\t<option value=\"\">请选择</option>\r\n\t\t\t\t\t</select>\r\n\t\t\t\t</div>\r\n\t\t\t\t\r\n\t\t\t\t<div class=\"form-line\">\r\n\t\t\t\t\t<label class=\"label\" for=\"receiver-address\"><span class=\"required\">*</span> 详细地址：</label>\r\n\t\t\t\t\t<input class=\"form-item\" id=\"receiver-address\" value=\"{{data.receiverAddress}}\" placeholder=\"请精确到门牌号\" />\r\n\t\t\t\t</div>\r\n\t\t\t\t\r\n\t\t\t\t<div class=\"form-line\">\r\n\t\t\t\t\t<label class=\"label\" for=\"receiver-phone\"><span class=\"required\">*</span>收件人手机：</label>\r\n\t\t\t\t\t<input class=\"form-item\" id=\"receiver-phone\" value=\"{{data.receiverPhone}}\" placeholder=\"请输入11位手机号\" />\r\n\t\t\t\t</div>\r\n\t\t\t\t\r\n\t\t\t\t<div class=\"form-line\">\r\n\t\t\t\t\t<label class=\"label\" for=\"receiver-zip\">邮政编码：</label>\r\n\t\t\t\t\t<input class=\"form-item\" id=\"receiver-zip\" value=\"{{data.receiverZip}}\" placeholder=\"如：111111\" />\r\n\t\t\t\t</div>\r\n\t\t\t\t\r\n\t\t\t\t<div class=\"form-line\">\r\n\t\t\t\t    <input type=\"hidden\" id=\"receiver-id\" value=\"{{data.id}}\" />\r\n\t\t\t\t\t<a class=\"btn address-btn\">保存收货地址</a>\r\n\t\t\t\t</div>\r\n\t\t\t\t\r\n\t\t\t</div>\r\n\t\t</div>\r\n\t</div>\r\n</div>";

/***/ }),

/***/ 8:
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/*
 * @autor：xiangzi
 * @Date: 2019-1-16  00：31
 * @Last modified time : 2019-1-16  00：31
 */



__webpack_require__(9);
var _mm   = __webpack_require__(0);
console.log(_mm.getUrlParam('keyword'));
//通用页面头部
var header   = {
	init         : function(){
		this.onLoad();
		this.bindEvent();
	},
	//将url中的搜索参数回填至搜索框中
	onLoad : function(){
		var keyword = _mm.getUrlParam('keyword');
		if(keyword){
			$('#search-input').val(keyword);
		};
	},
	// 搜索按钮的点击事件，点击则进行搜索提交
	bindEvent    : function(){
		var _this = this;
		$('#search-btn').click(function(){
			_this.searchSubmit();
		});
		// 按下回车按钮，做搜索提交
		$('#search-input').keyup(function(e){
			// 13是回车键的keyCode
			if(e.keyCode === 13){
				_this.searchSubmit();
			}
		});
	},
	//搜索的提交，这里就是调到list页，并且把搜索参数传过去，剩下的逻辑由list页来处理。
	searchSubmit : function(){
		var keyword = $.trim($('#search-input').val());
		// 如果提交的时候有keyword，正常跳转到list页
		if(keyword){
			window.location.href = './list.html?keyword=' + keyword;
		}
		// 如果keyword为空，则返回首页
		else{
			_mm.goHome();
		}
	}
};
//模块输出的时候初始化一下header对象，因为没有地方会调用这个搜索所以就不用输出啦！
header.init();


/***/ }),

/***/ 9:
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ })

/******/ });