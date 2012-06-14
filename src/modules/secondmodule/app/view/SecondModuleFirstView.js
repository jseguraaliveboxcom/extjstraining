Ext.define('SecondModule.view.SecondModuleFirstView',{
	
	extend: 'Ext.container.Container',
	alias: 'widget.secondmodulefirstview',
	
	initComponent: function(){
		this.items = [
			{
				xtype: 'label',
                text: 'Second Module -> First View'
			}
		];
		this.callParent(arguments);
	}
	
});