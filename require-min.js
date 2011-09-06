/**
 * require.js - NodeJS-Style require() for the browser - https://github.com/oleics/require.js
 * 
 * https://github.com/oleics/require.js
 * 
 * Copyright (c) 2011 Oliver Leics
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
(function(){var createXHR,cwds,exports,extentions,getCwd,getExtension,getType,grabExports,load,modules,popCwd,pushCwd,require,runCode,runners,__hasProp=Object.prototype.hasOwnProperty;exports={},modules={},grabExports=function(a){var b,c;modules[a]={};for(b in exports){if(!__hasProp.call(exports,b))continue;c=exports[b],modules[a][b]=c,delete exports[b]}return modules[a]},cwds=[],pushCwd=function(a){var b;return b=a.split("/"),b.pop(),b=b.join("/"),cwds.unshift(b)},popCwd=function(){return cwds.shift()},getCwd=function(){return cwds[0]!=null?cwds[0]+"/":""},extentions={js:"js",coffee:"cs",css:"css"},runners={js:function(code){return eval(code)},cs:function(code){return eval(CoffeeScript.compile(code))},css:function(a){var b;return b=document.createElement("style"),b.appendChild(document.createTextElement(a)),document.getElementsByTagName("head")[0].appendChild(b)}},getExtension=function(a){var b;return b=a.split("/").pop().split("."),b.length>1&&(b=b.pop()),b},getType=function(a){return extentions[a]!=null?extentions[a]:"js"},runCode=function(a,b){return runners[a](b)},createXHR=function(){if(window.XMLHttpRequest!=null)return new XMLHttpRequest;if(window.ActiveXObject!=null)return new ActiveXObject("Microsoft.XMLHTTP");throw"XMLHttpRequest not found."},load=function(a){var b;b=createXHR(),b.open("GET",getCwd()+a,!1),b.send(null),pushCwd(a);try{runCode(getType(getExtension(a)),b.responseText)}catch(c){console.error(c)}finally{grabExports(a),popCwd()}return modules[a]},require=function(a){return a in modules?modules[a]:load(a)},window.exports=exports,window.require=require}).call(this)