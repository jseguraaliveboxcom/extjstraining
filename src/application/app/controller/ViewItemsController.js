Ext.define('App.controller.ViewItemsController', {
	
    extend: 'Ext.app.Controller',
    
    views: [
    	'application.ApplicationView'
    ],
    
    models: [
    	'ViewItem'
    ],
    
    refs: [
    	{
    		ref: 'viewsToolbar',
    		selector: 'toolbar[name=viewsToolbar]'
    	},
    	{
    		ref: 'mainContainer',
    		selector: 'container[name=mainContainer]'
    	}
    ],
    
    /**
     * Initializes components listeners
     */
    init: function() {
    	EventBus.addListener(FrameworkEvents.MODULE_LOADED,this.createViewItemsOptions,this);
    	EventBus.addListener(FrameworkEvents.ADD_VIEW,this.addViewToMainContainer,this);
    	EventBus.addListener(FrameworkEvents.SELECT_VIEW,this.selectView,this);
    },
    
    /**
     * For each of the view items of the selected ModuleItem, creates an option in the viewsToolbar
     */
    createViewItemsOptions: function(){
        var tmpMainContainer = this.getMainContainer();
        tmpMainContainer.removeAll(true);
        var tmpViewsToolbar = this.getViewsToolbar();
        tmpViewsToolbar.suspendLayout = true;
        tmpViewsToolbar.removeAll(true);
    	if( this.isSelectedModuleItemUndefinedOrHasNoViews() ){
    		return;
    	}
    	var tmpViewItems = ModulesManager.selectedModuleItem.views();
    	for(var tmpIndex=0;tmpIndex < tmpViewItems.count();tmpIndex++){
    		var tmpViewItem = tmpViewItems.getAt(tmpIndex);
    		if(tmpViewItem.get("hidden")){
    			continue;
    		}
    		var tmpViewItemToolbarItem = GuiUtil.createToolbarButtonItem(tmpViewItem.get('name'),false,this,this.onViewItemSelected);
    		tmpViewItemToolbarItem.viewItem = tmpViewItem;
    		tmpViewsToolbar.add(tmpViewItemToolbarItem);
    	}
    	tmpViewsToolbar.suspendLayout = false;
    	tmpViewsToolbar.doLayout();
    },
    
    /**
     * Called when a new view is selected, updates the selected view
     */
    onViewItemSelected: function(argButton,argPressed){
    	if(!argPressed){
    		return;
    	}
    	ViewsManager.setSelectedView(argButton.viewItem);
    },
    
    /**
     * Indicates if the ModuleItem passed as parameter is invalid
     * or if its views collection is empty
     */
     isSelectedModuleItemUndefinedOrHasNoViews: function(){
    	if(!ModulesManager.selectedModuleItem){
    		return true;
    	}
    	var tmpViewItems = ModulesManager.selectedModuleItem.views();
    	if(!tmpViewItems || tmpViewItems.count() === 0){
    		return true;
    	}
    	return false
     },
    
    /**
     * Adds the view passed as parameter to the selectedTab
     */
    addViewToMainContainer: function(argViewInstance){
    	var tmpMainContainer = this.getMainContainer();
    	tmpMainContainer.add(argViewInstance);
    	var tmpMainContainerLayout = tmpMainContainer.getLayout();
    	tmpMainContainerLayout.setActiveItem(argViewInstance);
    },
    
    /**
     * Looks through the current views in the mainContainer,
     *  we select the view that has the viewItem passed as parameter
     */
    selectView: function(argViewItem){
    	var tmpMainContainer = this.getMainContainer();
    	var tmpMainContainerLayout = tmpMainContainer.getLayout();
    	for(var tmpIndex=0;tmpIndex < tmpMainContainer.items.length;tmpIndex++){
    		var tmpView = tmpMainContainer.items.getAt(tmpIndex);
    		if(tmpView.viewItem === argViewItem){
    			tmpMainContainerLayout.setActiveItem(tmpView);
    			break;
    		}
    	}
    }
   
});
