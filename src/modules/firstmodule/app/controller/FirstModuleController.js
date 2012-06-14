Ext.define('FirstModule.controller.FirstModuleController', {
	
    extend: 'Ext.app.Controller',
    
    views: [
    	'FirstModuleFirstView',
        'FirstModuleSecondView'
    ],
    
    /**
     * Initializes components listeners
     */
    init: function() {
    }
   
});
