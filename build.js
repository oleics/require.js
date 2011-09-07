
/*  */
var fs = require('fs');
var cs = require('coffee-script');
var jsp = require("uglify-js").parser;
var pro = require("uglify-js").uglify;

/*  */
project = {
    name: 'require.js',
    description: 'NodeJS-Style require() for the browser.',
    url: 'https://github.com/oleics/require.js',
    author: 'Oliver Leics <oliver.leics@gmail.com>',
    since: '2011/09/05',
    copyright: 'Copyright 2011 by Oliver Leics',
    license: 'Released under the MIT License '
}

/*  */
var coffeePath = 'require.coffee';
var sourcePath = 'require.js';
var targetPath = 'require-min.js';

/*  */
var licensePath = 'LICENSE';
var versionPath = 'VERSION';

/*  */
project.version = fs.readFileSync(versionPath).toString();

/*  */
var license = '/**'
            +'\r\n * {name}'
            +'\r\n * {description}'
            +'\r\n * '
            +'\r\n * @version {version}'
            +'\r\n * @author {author}'
            +'\r\n * @since {since}'
            +'\r\n * @url {url}'
            +'\r\n * '
            +'\r\n * '+fs.readFileSync(licensePath).toString().split('\r\n').join('\r\n * ')+''
            +'\r\n */';

var licenseMin = '/**'
            +'\r\n * {name} v{version}'
            +'\r\n * {url}'
            +'\r\n * '
            +'\r\n * {copyright}'
            +'\r\n * {license}'
            +'\r\n */';

/*  */
var key;
for(key in project) {
    if(project.hasOwnProperty(key)) {
        license = license.replace(new RegExp('{'+key+'}', 'g'), project[key]);
        licenseMin = licenseMin.replace(new RegExp('{'+key+'}', 'g'), project[key]);
    }
}

/*  */
console.log('Coffee: '+coffeePath+'');
coffee = fs.readFileSync(coffeePath).toString();
hot_coffee = cs.compile(coffee);
hot_coffee = license+'\r\n'+hot_coffee;
fs.writeFileSync(sourcePath, hot_coffee);
console.log(' -> '+sourcePath+' ('+hot_coffee.length+' bytes)');

/*  */
var ast = jsp.parse(hot_coffee); // parse code and get the initial AST
ast = pro.ast_mangle(ast); // get a new AST with mangled names
ast = pro.ast_squeeze(ast); // get an AST with compression optimizations
var final_code = pro.gen_code(ast); // compressed code here

/*  */
final_code = licenseMin+'\r\n'+final_code;
fs.writeFileSync(targetPath, final_code);
console.log(' -> '+targetPath+' ('+final_code.length+' bytes)');
