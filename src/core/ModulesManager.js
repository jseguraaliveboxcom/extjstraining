/**
 * Handles all logic related to the application modules
 */
Ext.define('ModulesManager', {
	
	extend: 'Object',
    singleton: true,
    
    /**
     * Contains the modules that have been already loaded so we dont loaded them again
     */
    loadedModules: {},
    
    selectedModuleItem: undefined,
    selectedModuleInstance: undefined,
    oldSelectedModuleItem: undefined,
    oldSelectedModuleInstance: undefined,
    
    /**
     * Sets the selectedModuleItem in the session and fires the moduleItemSelected event
     */
    setSelectedModuleItem: function(argModuleItem){
    	this.oldSelectedModuleItem = this.selectedModuleItem;
    	this.oldSelectedModuleInstance = this.selectedModuleInstance;
    	this.selectedModuleItem = argModuleItem;
    	if( !argModuleItem || !argModuleItem.get('moduleFolder') ){
    		return;
    	}
    	this.loadModule();
    },
    
    /**
     * Loads the module associated to the moduleItem passed as parameter
     */
    loadModule: function(){
    	if(!this.selectedModuleItem){
    		return;
    	}
    	this.unloadOldModule();
    	this.loadingMask = new Ext.LoadMask(Ext.getBody(), {msg:"Loading Module"});
		this.loadingMask.show();
    	if(this.loadedModules[this.selectedModuleItem.get('name')]){
    		this.onModuleLoaded();
    		return;
    	}
    	this.loadModuleAppFile();
    },

    /**
     * Unloads old module, unloads if needed the css file and
     *  calls the clearModelLocator function
     */
    unloadOldModule: function(){
        if(!this.oldSelectedModuleItem){
            return;
        }
        this.oldSelectedModuleInstance.clear();
    },
    
    /**
     * Loads the module app javascript file
     */
    loadModuleAppFile: function(){
    	var tmpModuleFolderName = this.selectedModuleItem.get('moduleFolder');
    	var tmpModuleAppFile = "modules/" + tmpModuleFolderName + "/app.js";
    	
    	Ext.Ajax.request({
            url: tmpModuleAppFile,
            success: function(argResponse,argRequest){
            	eval(argResponse.responseText);
            	this.onModuleLoaded();
            },
            failure: this.onModuleFailure,
            scope: this 
        });
    	
    },
    
    /**
     * Called when the module was loaded, here we try to create the module instance,
     * in case that is not possible an error is shown to the user
     */
    onModuleLoaded: function(){
    	this.createModuleInstance();
    },

    /**
     * Called if an error occurred loading a specific module
     */
    onModuleFailure: function(argResponse,argRequest){
        ErrorsManager.handleFatalError(ErrorCodes.APP_MODULE_NOT_FOUND,"\n" + argRequest.url);
    },
    
    /**
     * Here we create the module instance and we add it to the loadedModules map
     */
    createModuleInstance: function(){
    	var tmpModuleInstance = Ext.create(this.selectedModuleItem.get('name'),{
			moduleItem: this.selectedModuleItem,
			afterLaunchFunction: this.initializeModule,
			afterLaunchFunctionScope: this
		});
		this.loadedModules[this.selectedModuleItem.get('name')] = true;
    },
    
    /**
     * Here we execute the module initialization process
     */
    initializeModule: function(argModuleInstance){
    	this.selectedModuleInstance = argModuleInstance;
    	this.selectedModuleInstance.init();
    	ViewsManager.clearLoadedViews();
    	this.loadingMask.hide();
    	EventBus.fireEvent(FrameworkEvents.MODULE_LOADED,argModuleInstance);
    }
    
});
