Ext.Loader.setConfig({enabled:true});

Ext.application({
	
    name: 'App',
    
    appFolder: 'application/app',

    controllers: [
    	'ModuleItemsController',
        'ViewItemsController'
    ],
    
    /**
     * Launches the main application
     */
    launch: function(){
    	EventBus.addListener(FrameworkEvents.APP_INIT_COMPLETE,this.onAppInitComplete,this);
    	var tmpAppInitializer = new ApplicationInitializer();
    	tmpAppInitializer.init();
    },
    
    onAppInitComplete: function(){
    	Ext.create('Ext.container.Viewport', {
            items: [
                {
                    xtype: 'applicationview'
                }
            ]
        });
    }
    
});