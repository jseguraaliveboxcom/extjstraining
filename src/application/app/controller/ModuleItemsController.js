Ext.define('App.controller.ModuleItemsController', {
	
    extend: 'Ext.app.Controller',
    
    views: [
    	'application.ApplicationView'
    ],
    
    models: [
    	'ModuleItem'
    ],
    
    stores: [
    	'ModuleItems'
    ],
    
    refs: [
    	{
    		ref: 'mainToolbar',
    		selector: 'toolbar[name=mainToolbar]'
    	}
    ],
    
    /**
     * Initializes components listeners
     */
    init: function() {
    	this.control({
    		'applicationview' : {
    			afterrender: this.onApplicationViewAfterRender
    		}
    	});
    },
    
    /**
     * Called on applicationView render event, loads the ModuleItems store
     */
    onApplicationViewAfterRender: function(){
    	var tmpModuleItemsStore = Ext.data.StoreManager.lookup('ModuleItems');
    	tmpModuleItemsStore.load({
    		scope: this,
    		callback: this.onModuleItemsLoaded
		});
    },
    
    /**
     * Called when the ModuleItems store was loaded
     */
    onModuleItemsLoaded: function(argRecords,argOperation,argSuccess){
    	if(!argSuccess){
    		ErrorsManager.handleFatalError(ErrorCodes.APP_LOADING_MODULES_STORE);
    		return;
    	}
    	this.validateMainToolbarVisibility();
    	this.createModuleItemsOptions();
    },
    
    /**
     * Validates if the main toolbar has to be visible or not,
     * if we have just one module we will hide it, otherwise it will be visible
     */
    validateMainToolbarVisibility: function(){
    	var tmpModuleItemsStore = Ext.data.StoreManager.lookup('ModuleItems');
    	var tmpMainToolbar = this.getMainToolbar();
    	var tmpVisibleModules = 0;
    	for(var tmpIndex=0;tmpIndex < tmpModuleItemsStore.getCount();tmpIndex++){
    		var tmpModuleItem = tmpModuleItemsStore.getAt(tmpIndex);
    		if( !tmpModuleItem.get('hidden') ){
    			tmpVisibleModules++;
    		}
    	}
    	if(tmpVisibleModules === 1){
    		tmpMainToolbar.setVisible(false);
    	}
    },
    
    /**
     * For each moduleItem in ModuleItems store creates an option in the mainToolbar
     * also selects the default ModuleItem
     */
    createModuleItemsOptions: function(){
    	var tmpModuleItemsStore = Ext.data.StoreManager.lookup('ModuleItems');
    	var tmpMainToolbar = this.getMainToolbar();
    	tmpMainToolbar.suspendLayout = true;
    	for(var tmpIndex=0;tmpIndex < tmpModuleItemsStore.getCount();tmpIndex++){
    		var tmpModuleItem = tmpModuleItemsStore.getAt(tmpIndex);
    		if(tmpModuleItem.get("hidden")){
    			continue;
    		}
    		var tmpModuleItemToolbarItem = GuiUtil.createToolbarButtonItem(tmpModuleItem.get('name'),false,this,this.onModuleItemSelected);
    		tmpModuleItemToolbarItem.moduleItem = tmpModuleItem;
    		tmpMainToolbar.add(tmpModuleItemToolbarItem);
    	}
    	tmpMainToolbar.suspendLayout = false;
    	tmpMainToolbar.doLayout();
    },
    
    /**
     * Called when a new moduleItem is selected,
     * updates the seletecModuleItem and displays the corresponding site view items 
     * for the selected moduleItem
     */
    onModuleItemSelected: function(argButton,argPressed){
    	if(!argPressed){
    		return;
    	}
    	ModulesManager.setSelectedModuleItem(argButton.moduleItem);
    }
    
});
