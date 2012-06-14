Ext.define('FirstModule.view.FirstModuleSecondView',{
	
	extend: 'Ext.container.Container',
	alias: 'widget.firstmodulesecondview',
	
	initComponent: function(){
		this.items = [
			{
				xtype: 'label',
                text: 'First Module -> Second View'
			}
		];
		this.callParent(arguments);
	}
	
});