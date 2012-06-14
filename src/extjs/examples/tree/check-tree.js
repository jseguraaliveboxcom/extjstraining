/*

This file is part of Ext JS 4

Copyright (c) 2011 Sencha Inc

Contact:  http://www.sencha.com/contact

Commercial Usage
Licensees holding valid commercial licenses may use this file in accordance with the Commercial Software License Agreement provided with the Software or, alternatively, in accordance with the terms contained in a written agreement between you and Sencha.

If you are unsure which license is appropriate for your use, please contact the sales department at http://www.sencha.com/contact.

*/
Ext.require([
    'Ext.tree.*',
    'Ext.data.*',
    'Ext.window.MessageBox'
]);

Ext.onReady(function() {
    var store = Ext.create('Ext.data.TreeStore', {
        proxy: {
            type: 'ajax',
            url: 'check-nodes.json'
        },
        sorters: [{
            property: 'leaf',
            direction: 'ASC'
        }, {
            property: 'text',
            direction: 'ASC'
        }]
    });

    var tree = Ext.create('Ext.tree.Panel', {
        store: store,
        rootVisible: false,
        useArrows: true,
        frame: true,
        title: 'Check Tree',
        renderTo: 'tree-div',
        width: 200,
        height: 250,
        dockedItems: [{
            xtype: 'toolbar',
            items: {
                text: 'Get checked nodes',
                handler: function(){
                    var records = tree.getView().getChecked(),
                        names = [];
                    
                    Ext.Array.each(records, function(rec){
                        names.push(rec.get('text'));
                    });
                    
                    Ext.MessageBox.show({
                        title: 'Selected Nodes',
                        msg: names.join('<br />'),
                        icon: Ext.MessageBox.INFO
                    });
                }
            }
        }]
    });
});

