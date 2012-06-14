<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.1//EN" "http://www.w3.org/TR/xhtml11/DTD/xhtml11.dtd">
<html xmlns="http://www.w3.org/1999/xhtml" dir="ltr" >

	<head>
		
		<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
		
		<title>Application</title>
		
		<!--  CSS INCLUDES - START -->
		
		<link rel="stylesheet" type="text/css" href="extjs/resources/css/ext-all.css">
		<link rel="stylesheet" type="text/css" href="resources/css/framework-styles.css" />

		<!--  CSS INCLUDES - END -->
		
		<!--  PHP INCLUDES - START -->
		
		<?php
			include('util/JavaScriptIncluder.php');
		?>
		
		<!--  PHP INCLUDES - END -->
		
		<!--  JAVASCRIPT INCLUDES - START -->
		
		<script type="text/javascript" src="extjs/ext-all-debug.js"></script>
		
		<?php 
			JavaScriptIncluder::includeAll('core');
			JavaScriptIncluder::includeAll('util');
            JavaScriptIncluder::includeAll('ux');
		?>

		<script type="text/javascript" src="application/app.js"></script>
		
		<!--  JAVASCRIPT INCLUDES - END -->

	</head>
	
	<body>
	</body>

</html>