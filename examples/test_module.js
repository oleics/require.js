
(function(exports){
    
    /* must be called here: */
    var test_module_coffee = require('test_module.coffee');
    
    exports.test = function() {
        console.log('test_module.test called :)');
        test_module_coffee.test();        
    };
    
})(exports);
