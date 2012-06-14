Ext.define('App.view.application.ApplicationView',{
	
	extend: 'Ext.container.Container',
	alias: 'widget.applicationview',
	
	initComponent: function(){
		this.addCls('applicationContainer');
		this.items = [
			{
				xtype: 'toolbar',
				name: 'mainToolbar',
				cls: 'mainToolbar',
                defaults: {
                    enableToggle: true,
                    toggleGroup: 'mainToolbar',
                    allowDepress: false
                }
			},
			{
				xtype: 'toolbar',
				cls: 'viewsToolbar',
				name: 'viewsToolbar',
                defaults: {
                    enableToggle: true,
                    toggleGroup: 'viewsToolbar',
                    allowDepress: false
                }
			},
			{
				xtype: 'container',
				name: 'mainContainer',
				cls: 'mainContainer',
				layout: 'card'
			}
		];
		this.callParent(arguments);
	}
	
});