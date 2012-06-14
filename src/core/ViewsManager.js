/**
 * Handles all logic related to the application modules views
 */
Ext.define('ViewsManager', {
	
	extend: 'Object',
    singleton: true,
    
    /**
     * Contains the views that have been already loaded so we dont loaded them again
     */
    loadedViews: {},
    selectedViewsMap: {},
    
    /**
     * Sets the selectedView in the session and in the selectedViewsMap, 
     * we store a selected view for every moduleItem
     */
    setSelectedView: function(argView){
    	if(!ModulesManager.selectedModuleItem){
    		return;
    	}
    	this.selectedViewsMap[ModulesManager.selectedModuleItem.get('name')] = argView;
    	if( !argView){
    		return;
    	}
    	this.createSelectedView(argView);
    },
    
    /**
     * If selected view has not been loaded yet, we create a new instance of it
     *  and we add that view in the mainContainer
     * If selected view has been already loaded, we select that view in the mainContainer
     */
    createSelectedView: function(argSelectedViewItem){
    	var tmpSelectedModuleItem = ModulesManager.selectedModuleItem;
    	var tmpViewName = tmpSelectedModuleItem.get('name') + ".view." + argSelectedViewItem.get('name');
    	if(this.loadedViews[tmpViewName]){
    		EventBus.fireEvent(FrameworkEvents.SELECT_VIEW,argSelectedViewItem);
    		return;
    	}
    	try{
    		var tmpViewInstance = Ext.create(tmpViewName);
    		tmpViewInstance.viewItem = argSelectedViewItem;
    	}catch(e){
    		ErrorsManager.handleSimpleError(ErrorCodes.APP_CREATING_VIEW,"\n" + tmpViewName);
    		return;
    	}
    	this.loadedViews[tmpViewName] = true;
    	EventBus.fireEvent(FrameworkEvents.ADD_VIEW,tmpViewInstance);
    },
    
    /**
     * Clear the loadedViews map
     */
    clearLoadedViews: function(){
    	this.loadedViews = {};
    }
    
});
