/**
 * Handles all logic related to the errors handling in the application
 */
Ext.define('ErrorsManager', {
	
	extend: 'Object',
    singleton: true,
    
    /**
     * Shows a fatal error, these kind of errors stops the application,
     * a popup not closable is shown with the error detail
     * @param {String} argErrorCode The error code to be displayed
     * @param {String} (optional) argExtraMessage Option message that will be concatenated to error message
     */
    handleFatalError: function(argErrorCode,argExtraMessage){
    	this.showErrorWindow(argErrorCode,argExtraMessage,"Fatal Error!!!",false);
    },
    
    /**
     * Shows a fatal error, these kind of errors stops the application,
     * a popup closable is shown with the error detail
     * @param {String} argErrorCode The error code to be displayed
     * @param {String} (optional) argExtraMessage Option message that will be concatenated to error message
     */
    handleSimpleError: function(argErrorCode,argExtraMessage){
    	this.showErrorWindow(argErrorCode,argExtraMessage,"Error",true);
    },
    
    showErrorWindow: function(argErrorCode,argExtraMessage,argTitle,argClosable){
    	if( !argErrorCode || !ErrorCodes[argErrorCode] ){
    		return;
    	}
    	var tmpMessage = ErrorCodes[argErrorCode];
    	if(argExtraMessage){
    		tmpMessage += argExtraMessage;
    	}
    	var tmpErrorWindow = Ext.create('App.ux.ErrorWindow',{
    		title: argTitle,
    		closable: argClosable,
    		errorMessage: tmpMessage
    	});
    	tmpErrorWindow.show();
    }
    
});
