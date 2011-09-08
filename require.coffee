# 
# require.js
# NodeJS-style require() for the browser.
# 
# @author Oliver Leics
# @since 2011/09/05
# @version 0.1.0
# 
# Copyright (c) 2011 Oliver Leics
# 
# Permission is hereby granted, free of charge, to any person
# obtaining a copy of this software and associated documentation
# files (the "Software"), to deal in the Software without
# restriction, including without limitation the rights to use,
# copy, modify, merge, publish, distribute, sublicense, and/or sell
# copies of the Software, and to permit persons to whom the
# Software is furnished to do so, subject to the following
# conditions:
# 
# The above copyright notice and this permission notice shall be
# included in all copies or substantial portions of the Software.
# 
# THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
# EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES
# OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
# NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT
# HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY,
# WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
# FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR
# OTHER DEALINGS IN THE SOFTWARE.
#

# 
# An object is used to cache all exports a module may make.
# 
exports = {}
modules = {}

grabExports = (module) ->
    modules[module] = {}
    for own key, value of exports
        modules[module][key] = value
        delete exports[key]
    modules[module]
    
# 
# Some functions for the switch of working directory of a script to keep calls
# to require() inside a script relative to the scripts path.
# 
cwds = []

pushCwd = (module) ->
    cwd = module.split('/')
    cwd.pop()
    cwd = cwd.join('/')
    cwds.unshift(cwd)

popCwd = ->
    cwds.shift()

getCwd = ->
    if cwds[0]?
        return cwds[0]+'/'
    else
        return ''

# 
# 
# 
extentions =
    js:     'js'
    coffee: 'cs'
    css:    'css'

runners =
    js: (code) -> eval code
    cs: (code) -> eval CoffeeScript.compile(code)
    css: (code) ->
        style = document.createElement('style')
        style.appendChild(document.createTextElement(code))
        document.getElementsByTagName('head')[0].appendChild(style)

getExtension = (path) ->
    ext = path.split('/').pop().split('.')
    ext = ext.pop() if ext.length > 1
    ext

getType = (ext) ->
    return extentions[ext] if extentions[ext]?
    'js'

runCode = (type, code) ->
    runners[type](code)

# 
# 
# 
createXHR = ->
    if window.XMLHttpRequest?
        return new XMLHttpRequest()
    else if window.ActiveXObject?
        return new ActiveXObject('Microsoft.XMLHTTP')
    else
        throw 'XMLHttpRequest not found.'

load = (module) ->
    xhr = createXHR()
    xhr.open('GET', module, false)
    xhr.send(null)
    pushCwd(module) # Switch the working directory
    try
        runCode(getType(getExtension(module)), xhr.responseText)  # Execute the code
    catch error
        console.error error
    finally
        popCwd() # Switch back to the previous working directory
        grabExports(module)
    modules[module]

# 
# 
# 
require = (module) ->
    _module = getCwd()+module # Prepend the working directory
    if _module of modules
        return modules[_module]
    load(_module)

# 
# 
# 
window.exports = exports
window.require = require
