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
/******/ 	return __webpack_require__(__webpack_require__.s = 65);
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

/***/ 10:
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/*
 * @autor：xiangzi
 * @Date: 2019-1-16  00：31
 * @Last modified time : 2019-1-16  00：31
 */



__webpack_require__(11);
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

/***/ 11:
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

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

/***/ 65:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(66);


/***/ }),

/***/ 66:
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/*
 * @autor：xiangzi
 * @Date: 2019-02-07  19：53
 * @Last modified time : 2019-02-07  19：53
 */


__webpack_require__(67);
__webpack_require__(10);
var nav           = __webpack_require__(8);
var _mm           = __webpack_require__(0);
var _cart         = __webpack_require__(5);
var templateIndex = __webpack_require__(68);

var page = {
	data   : {
		
	},
	init   : function(){
		this.onLoad();
		this.bindEvent();
	},
	onLoad : function(){
		this.loadCart();
	},
	bindEvent : function(){
		var _this = this;
		// 商品的选择，取消选择
		$(document).on('click','.cart-select',function(){
			var $this     = $(this);
			//获取选中，取消选中商品的productId
			var productId = $this.parents('.cart-table').data('product-id');
			//全选
			if($this.is(':checked')){
				_cart.selectProduct(productId,function(res){
					_this.renderCart(res);
				},function(errMsg){
					_this.showCartError();
				});
			}
			//取消选中
			else{
				_cart.unselectProduct(productId,function(res){
					_this.renderCart(res);
				},function(errMsg){
					_this.showCartError();
				})
			}
		});
		// 商品的全选，取消全选
		$(document).on('click','.cart-select-all',function(){
			var $this     = $(this);
			// 全选
			if($this.is(':checked')){
				_cart.selectAllProduct(function(res){
					_this.renderCart(res);
				},function(errMsg){
					_this.showCartError();
				});
			}
			//取消全选
			else{
				_cart.unselectAllProduct(function(res){
					_this.renderCart(res);
				},function(errMsg){
					_this.showCartError();
				})
			}
		});
		//商品数量的变化
		$(document).on('click','.count-btn',function(){
			var $this      = $(this);
			var $pCount    = $this.siblings('.count-input');
			var currCount  = parseInt($pCount.val());
			var type       = $this.hasClass('plus') ? 'plus' : 'minus';
			var productId  = $this.parents('.cart-table').data('product-id');
			var minCount   = 1;
			var maxCount   = parseInt($pCount.data('max'));
			var newCount   = 0;
			if(type === 'plus'){
				if(currCount >= maxCount){
					_mm.errorTips('该商品数量已达到上限');
					//结束该分支，不再往下执行
					return
				}
				newCount = currCount + 1;
			}else if(type === 'minus'){
				if(currCount <= minCount){
					return;
				}
				newCount = currCount -1;
			}
			//更新购物车商品数量
			_cart.updateProduct({
				productId : productId,
				count     : newCount
			},function(res){
				_this.renderCart(res);
			},function(errMsg){
				_this.showCartError();
			});
		});
		// 删除单个商品
		$(document).on('click','.cart-delete',function(){
			if(window.confirm('确认要删除该商品？')){
				var productId = $(this).parents('.cart-table').data('product-id');
				_this.deleteCartProduct(productId);
			}
		});
		// 删除选中的商品
		$(document).on('click','.delete-selected',function(){
			if(window.confirm('确认要删除选中的商品？')){
				//先创建一个空数组对象
				var arrProductIds = [];
				// 获取所有已选中的元素，放到一个数组对象中
				var selectedItem  = $('.cart-select:checked');
				// 循环查找选中的productIds
				for(var i=0,iLength=selectedItem.length;i<iLength;i++){
					arrProductIds.push($(selectedItem[i]).parents('.cart-table').data('product-id'));
				}
				if(arrProductIds.length){
					_this.deleteCartProduct(arrProductIds.join(','));
				}
				else{
					_mm.errorTips('您还没有选中要删除的商品');
				}
			}
		});
		// 提交购物车
		$(document).on('click','.btn-submit',function(){
			// 购物车总价大于0，则进行提交
			if(_this.data.cartInfo && _this.data.cartInfo.cartTotalPrice >0 ){
				window.location.href = './order-confirm.html';
			}else{
				_mm.errorTips('请选择商品后再进行提交');
			}
		});
	},
	//加载商品详情
	loadCart : function(){
		var _this = this;
        // 获取购物车列表
        _cart.getCartList(function(res){
        	_this.renderCart(res);
        },function(errMsg){
        	_this.showCartError();
        })
	},
	// 渲染购物车
	renderCart : function(data){
		this.filter(data);
		//缓存购物车信息
		this.data.cartInfo = data;
		//生成html
		var cartHtml = _mm.renderHtml(templateIndex,data);
		$('.page-wrap').html(cartHtml);
		// 通知导航的购物车更新数量(调用nav内部的一个方法)
		nav.loadCartCount();
	},
	// 删除指定商品，支持批量，productId用逗号分割
	deleteCartProduct : function(productIds){
		var _this = this;
		_cart.deleteProduct(productIds,function(res){
			_this.renderCart(res);
		},function(errMsg){
			_this.showCartError();
		})
	},
	// 数据匹配
	filter :　function(data){
		data.notEmpty = !!data.cartProductVoList.length;
	},
	//显示错误信息
	showCartError : function(){
		$('.page-wrap').html('<p>哪里不对了，刷新一下试试吧</p>');
	}
};
$(function(){
	page.init();
})


/***/ }),

/***/ 67:
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),

/***/ 68:
/***/ (function(module, exports) {

module.exports = "{{#notEmpty}}\r\n<div class=\"cart-header\">\r\n\t<table class=\"cart-table\">\r\n\t\t<tr>\r\n\t\t\t<th class=\"cart-cell cell-check\">\r\n\t\t\t    <label class=\"cart-label\">\r\n\t\t\t       {{#allChecked}}\r\n\t\t\t       <input type=\"checkbox\" class=\"cart-select-all\" checked />\r\n\t\t\t       {{/allChecked}}\r\n\t\t\t       {{^allChecked}}\r\n\t\t\t       <input type=\"checkbox\" class=\"cart-select-all\" />\r\n\t\t\t       {{/allChecked}}\r\n\t\t\t\t   <span>全选</span>\r\n\t\t\t    </label>\r\n\t\t    </th>\r\n\t\t    <th class=\"cart-cell cell-info\">商品信息</th>\r\n\t\t    <th class=\"cart-cell cell-price\">单价</th>\r\n\t\t    <th class=\"cart-cell cell-count\">数量</th>\r\n\t\t    <th class=\"cart-cell cell-total\">合计</th>\r\n\t\t    <th class=\"cart-cell cell-opera\">操作</th>\r\n\t\t</tr>\r\n\t</table>\r\n</div>\r\n<div class=\"cart-list\">\r\n    {{#cartProductVoList}}\r\n\t<table class=\"cart-table\" data-product-id=\"{{productId}}\">\r\n\t\t<tr>\r\n\t\t\t<td class=\"cart-cell cell-check\">\r\n\t\t\t    <label class=\"cart-label\">\r\n\t\t\t        {{#productChecked}}\r\n\t\t\t        <input type=\"checkbox\" class=\"cart-select\" checked />\r\n\t\t\t        {{/productChecked}}\r\n\t\t\t        {{^productChecked}}\r\n\t\t\t        <input type=\"checkbox\" class=\"cart-select\" />\r\n\t\t\t        {{/productChecked}}\r\n\t\t\t    </label>\r\n\t\t    </td>\r\n\t\t    <td class=\"cart-cell cell-info\">\r\n\t\t        <a class=\"link\" href=\"./detail.html?productId={{productId}}\">\r\n\t\t            <img class=\"p-img\" src=\"{{imageHost}}{{productMainImage}}\" alt=\"{{productName}}\" />\r\n\t\t        </a>\r\n\t\t    </td>\r\n\t\t    <td>\r\n\t\t    \t<a class=\"link cell-name\" href=\"./detail.html?productId={{productId}}\">\r\n\t\t\t\t   {{productName}}\r\n\t\t\t    </a>\r\n\t\t    </td>\r\n\t\t    <td class=\"cart-cell cell-price\">￥{{productPrice}}</td>\r\n\t\t    <td class=\"cart-cell cell-count\">\r\n\t\t    \t<span class=\"count-btn minus\">-</span>\r\n\t\t    \t<input class=\"count-input\" value=\"{{quantity}}\" data-max=\"{{productStock}}\"/>\r\n\t\t    \t<span class=\"count-btn plus\">+</span>\r\n\t\t    </td>\r\n\t\t    <td class=\"cart-cell cell-total\">￥{{productTotalPrice}}</td>\r\n\t\t    <td class=\"cart-cell cell-opera\">\r\n\t\t\t    <span class=\"link cart-delete\">删除</span>\r\n\t\t    </td>\r\n\t\t</tr>\r\n\t</table>\r\n\t{{/cartProductVoList}}\t\t    \t\r\n\t<div class=\"cart-footer\">\t    \t\t\r\n\t\t<div class=\"select-con\">\r\n\t\t\t<label>\r\n\t\t\t\t{{#allChecked}}\r\n\t\t        <input type=\"checkbox\" class=\"cart-select-all\" checked />\r\n\t\t        {{/allChecked}}\r\n\t\t        {{^allChecked}}\r\n\t\t        <input type=\"checkbox\" class=\"cart-select-all\" />\r\n\t\t        {{/allChecked}}\r\n\t\t\t\t<span>全选</span>\r\n\t\t\t</label>\r\n\t\t</div>\r\n\t\t<div class=\"delete-con\">\r\n\t\t\t<span class=\"link delete-selected\">\r\n\t\t\t\t<i class=\"fa fa-trash-o\"></i>\r\n\t\t\t\t<span>删除选中</span>\r\n\t\t\t</span>\r\n\t\t</div>\r\n\t\t<div class=\"submit-con\">\r\n\t\t\t<span>总价：</span>\r\n\t\t\t<span class=\"submit-total\">￥{{cartTotalPrice}}</span>\r\n\t\t\t<span class=\"btn btn-submit\">去结算</span>\r\n\t\t</div>\r\n\t</div>\r\n</div>\r\n{{/notEmpty}}\r\n{{^notEmpty}}\r\n<p class=\"err-tip\"> \r\n   <span>您的购物车空空如也，</span>\r\n   <a href=\"./index.html\">立即去购物</a>\r\n</p>\r\n{{/notEmpty}}";

/***/ }),

/***/ 8:
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/*
 * @autor：xiangzi
 * @Date: 2019-1-14  23：32
 * @Last modified time : 2019-1-14  23：32
 */



__webpack_require__(9);
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

/***/ 9:
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ })

/******/ });