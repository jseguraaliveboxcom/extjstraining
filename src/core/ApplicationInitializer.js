/**
 * Handles all logic related to the application initialization
 */
Ext.define('ApplicationInitializer', {
	
	extend: 'Object',
    
    /**
     * Initializes the ApplicationInitializer listeners
     */
    init: function(){
        EventBus.fireEvent(FrameworkEvents.APP_INIT_COMPLETE);
    }
    
});
