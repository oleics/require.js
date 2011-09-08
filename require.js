/**
 * require.js
 * NodeJS-Style require() for the browser.
 * 
 * @version 0.1.1
 * @author Oliver Leics <oliver.leics@gmail.com>
 * @since 2011/09/05
 * @url https://github.com/oleics/require.js
 * 
 * Copyright (c) 2011 by Oliver Leics <oliver.leics@gmail.com>
 * 
 * Permission is hereby granted, free of charge, to any person
 * obtaining a copy of this software and associated documentation
 * files (the "Software"), to deal in the Software without
 * restriction, including without limitation the rights to use,
 * copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the
 * Software is furnished to do so, subject to the following
 * conditions:
 * 
 * The above copyright notice and this permission notice shall be
 * included in all copies or substantial portions of the Software.
 * 
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
 * EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES
 * OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
 * NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT
 * HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY,
 * WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
 * FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR
 * OTHER DEALINGS IN THE SOFTWARE.
 */
(function() {
  var createXHR, cwds, exports, extentions, getCwd, getExtension, getType, grabExports, load, modules, popCwd, pushCwd, require, runCode, runners;
  var __hasProp = Object.prototype.hasOwnProperty;
  exports = {};
  modules = {};
  grabExports = function(module) {
    var key, value;
    modules[module] = {};
    for (key in exports) {
      if (!__hasProp.call(exports, key)) continue;
      value = exports[key];
      modules[module][key] = value;
      delete exports[key];
    }
    return modules[module];
  };
  cwds = [];
  pushCwd = function(module) {
    var cwd;
    cwd = module.split('/');
    cwd.pop();
    cwd = cwd.join('/');
    return cwds.unshift(cwd);
  };
  popCwd = function() {
    return cwds.shift();
  };
  getCwd = function() {
    if (cwds[0] != null) {
      return cwds[0] + '/';
    } else {
      return '';
    }
  };
  extentions = {
    js: 'js',
    coffee: 'cs',
    css: 'css'
  };
  runners = {
    js: function(code) {
      return eval(code);
    },
    cs: function(code) {
      return eval(CoffeeScript.compile(code));
    },
    css: function(code) {
      var style;
      style = document.createElement('style');
      style.appendChild(document.createTextElement(code));
      return document.getElementsByTagName('head')[0].appendChild(style);
    }
  };
  getExtension = function(path) {
    var ext;
    ext = path.split('/').pop().split('.');
    if (ext.length > 1) ext = ext.pop();
    return ext;
  };
  getType = function(ext) {
    if (extentions[ext] != null) return extentions[ext];
    return 'js';
  };
  runCode = function(type, code) {
    return runners[type](code);
  };
  createXHR = function() {
    if (window.XMLHttpRequest != null) {
      return new XMLHttpRequest();
    } else if (window.ActiveXObject != null) {
      return new ActiveXObject('Microsoft.XMLHTTP');
    } else {
      throw 'XMLHttpRequest not found.';
    }
  };
  load = function(module) {
    var xhr;
    xhr = createXHR();
    xhr.open('GET', module, false);
    xhr.send(null);
    pushCwd(module);
    try {
      runCode(getType(getExtension(module)), xhr.responseText);
    } catch (error) {
      console.error(error);
    } finally {
      popCwd();
      grabExports(module);
    }
    return modules[module];
  };
  require = function(module) {
    var _module;
    _module = getCwd() + module;
    if (_module in modules) return modules[_module];
    return load(_module);
  };
  window.exports = exports;
  window.require = require;
}).call(this);
