/**
 * Utilitary class used to load and unload javascript and css files
 */
Ext.define('JsAndCssLoader', {
	
	extend: 'Object',
    singleton: true,
    
    /**
     * Loads the css file passed as parameter
     * @param {String} argCssFile
     */
    loadCss: function(argCssFile){
    	var tmpHeadID = document.getElementsByTagName("head")[0];
		var tmpCssNode = document.createElement('link');
		tmpCssNode.type = 'text/css';
		tmpCssNode.rel = 'stylesheet';
		tmpCssNode.href = argCssFile;
		tmpCssNode.media = 'screen';
		tmpHeadID.appendChild(tmpCssNode);
    },
    
    /**
     * Unloads the css file passed as parameter
     * @param {String} argCssFile
     */
    unloadCss: function(argCssFile){
    	var tmpTargetElement = "link";
		var tmpTargetAttr = "href";
		var tmpAllCtrl = document.getElementsByTagName(tmpTargetElement);
		for (var i=tmpAllCtrl.length; i>=0; i--){
			if( tmpAllCtrl[i] && tmpAllCtrl[i].getAttribute(tmpTargetAttr) !=null && tmpAllCtrl[i].getAttribute(tmpTargetAttr).indexOf(argCssFile)!=-1){
				tmpAllCtrl[i].parentNode.removeChild(tmpAllCtrl[i]);
			}
    	}
    },
    
    /**
     * Loads the javascript file passed as parameter
     * @param {String} argJavascriptFile
     */
    loadJavascript: function(argJavascriptFile){
    	var tmpHeadID = document.getElementsByTagName("head")[0];
		var tmpNewScript = document.createElement('script');
		tmpNewScript.type = 'text/javascript';
		tmpNewScript.src = argJavascriptFile;
		tmpHeadID.appendChild(newScript);
    },
    
    /**
     * Unloads the javascript file passed as parameter
     * @param {String} argJavascriptFile
     */
    unloadJavascript: function(argJavascriptFile){
    	var tmpTargetElement = "script";
		var tmpTargetAttr = "src";
		var tmpAllCtrl = document.getElementsByTagName(tmpTargetElement);
		for (var i=tmpAllCtrl.length; i>=0; i--){
			if( tmpAllCtrl[i] && tmpAllCtrl[i].getAttribute(tmpTargetAttr) !=null && tmpAllCtrl[i].getAttribute(tmpTargetAttr).indexOf(argJavascriptFile)!=-1){
				tmpAllCtrl[i].parentNode.removeChild(tmpAllCtrl[i]);
			}
    	}
    }
    
});
