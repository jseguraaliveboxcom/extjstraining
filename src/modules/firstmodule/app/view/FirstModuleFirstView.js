Ext.define('FirstModule.view.FirstModuleFirstView',{
	
	extend: 'Ext.container.Container',
	alias: 'widget.firstmodulefirstview',
	
	initComponent: function(){
		this.items = [
			{
				xtype: 'label',
                text: 'First Module -> First View'
			}
		];
		this.callParent(arguments);
	}
	
});