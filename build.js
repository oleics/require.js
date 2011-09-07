
/*  */
var fs = require('fs');
var jsp = require("uglify-js").parser;
var pro = require("uglify-js").uglify;

/*  */
var description = 'require.js - NodeJS-Style require() for the browser - https://github.com/oleics/require.js';
var url = 'https://github.com/oleics/require.js';
var licensePath = 'LICENSE';
var versionPath = 'VERSION';
var sourcePath = 'require.js';
var targetPath = 'require-min.js';

/*  */
var license = '/**'
            +'\r\n * '+description+''
            +'\r\n * '
            +'\r\n * @version '+fs.readFileSync(versionPath).toString()+''
            +'\r\n * '
            +'\r\n * '+url+''
            +'\r\n * '
            +'\r\n * '+fs.readFileSync(licensePath).toString().split('\r\n').join('\r\n * ')+''
            +'\r\n */';

/*  */
var orig_code = fs.readFileSync(sourcePath).toString();
var ast = jsp.parse(orig_code); // parse code and get the initial AST
ast = pro.ast_mangle(ast); // get a new AST with mangled names
ast = pro.ast_squeeze(ast); // get an AST with compression optimizations
var final_code = pro.gen_code(ast); // compressed code here

/*  */
final_code = license+'\r\n'+final_code;
fs.writeFileSync(targetPath, final_code);
console.log(targetPath+' written.');
