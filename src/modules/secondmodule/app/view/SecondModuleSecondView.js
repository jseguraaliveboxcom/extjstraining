Ext.define('SecondModule.view.SecondModuleSecondView',{
	
	extend: 'Ext.container.Container',
	alias: 'widget.secondmodulesecondview',
	
	initComponent: function(){
		this.items = [
			{
				xtype: 'label',
                text: 'Second Module -> Second View'
			}
		];
		this.callParent(arguments);
	}
	
});