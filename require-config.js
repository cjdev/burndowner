var require = {
    baseUrl: '.',
    paths: {
        jquery: 'lib/jquery/jquery-1.7.2.min',
        underscore: 'lib/underscore/underscore-min',
        text: 'lib/require/plugins/text',
        flot: 'lib/flot/jquery.flot.min',
        "flot-stack": 'lib/flot/jquery.flot.stack.min',
        qunit: 'lib/qunit/qunit'
        
        
    },
    shim: {
        underscore: {
            exports: '_'
        },
        jquery: {
            exports: '$'
        },
        flot:{
            exports: '$.fn.plot',
            deps: ['jquery']
        },
        "flot-stack":{
            deps: ['flot']
        },
        qunit:{
            exports: 'window.test',
            deps: ['jquery']
        }
       
    }
};
