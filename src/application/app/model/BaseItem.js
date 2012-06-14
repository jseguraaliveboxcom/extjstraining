Ext.define('App.model.BaseItem', {
	
    extend: 'Ext.data.Model',
    
    fields: [
    	{name: 'name'},
    	{name: 'isSelected',type:'boolean',defaultValue:false},
    	{name: 'hidden', type:'boolean',defaultValue:false}
    ]
    
});