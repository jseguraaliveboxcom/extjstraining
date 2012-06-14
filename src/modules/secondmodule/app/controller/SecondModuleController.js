Ext.define('SecondModule.controller.SecondModuleController', {
	
    extend: 'Ext.app.Controller',
    
    views: [
    	'SecondModuleFirstView',
        'SecondModuleSecondView'
    ],
    
    /**
     * Initializes components listeners
     */
    init: function() {
    }
   
});
