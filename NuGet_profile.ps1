function hat {

	param (
	  [string]$template,
	  [string]$value
	)

	$value = $value.replace("/","\")
	
	$solutionDir = $(get-location)
	$indexPath = [System.String]::Concat($solutionDir, '\', "app\index.html")
	$appPath = [System.String]::Concat($solutionDir, '\', "app\scripts\app.js")
	$appName = (select-string "angular.module.'.*'. ..." "$appPath")[0].Line.split("'")[1]
	$fileName = $value.split("\")[-1]
	
	$controllerName = ""
	$value.split("\") | % { $controllerName = $controllerName + $_.substring(0,1).toupper() + $_.substring(1).tolower()} 
	$controllerName = $controllerName + "Ctrl"
	$scriptFolderName = ""
	
	write-host "debug: " -foregroundcolor green
	
	[bool]$createController = $false
	[bool]$createView = $false
	[bool]$createRoute = $false
	[bool]$createDirective = $false
	[bool]$createFilter = $false
	[bool]$createService = $false
	[bool]$createScriptRef = $false
	
	switch ($template)
		{
			"controller" 
			{
				$scriptFolderName = "controllers"
				$createController = $true
				$createScriptRef = $true
			}
			
			"route"
			{
				$scriptFolderName = "controllers"
				$createController = $true
				$createView = $true
				$createRoute = $true
				$createScriptRef = $true
			}
			
			"directive" 
			{
				$scriptFolderName = "directives"
				$createDirective = $true
				$createScriptRef = $true
			}
			
			"filter" 
			{
				$scriptFolderName = "filters"
				$createFilter = $true
				$createScriptRef = $true
			}
			
			"view"
			{
				$createView = $true
			}
			
			"service"
			{
				$scriptFolderName = "services"
				$createService = $true
				$createScriptRef = $true
			}
			
			default
			{
				write-host "Unknown command: $template. Valid commands are: controller, route, directive, filter, view, and service." -foregroundcolor red
			}
		}
	
	
	if (!(Test-Path $appPath)) {
		write-host "app.js not found. Run this command in the root of your site." -foregroundcolor red
		return $false
	}
	
	###########################################################################
	# Create Controller File
	if($createController)
	{	
		$filePath = [System.String]::Concat($solutionDir, '\', "app\scripts\controllers\" + $value + ".js")
		
		if ((Test-Path $filePath)) {
			clear-content "$filePath"
		}
		else {
			$folder = Split-Path -parent "$filePath"
			if(!(Test-Path $folder)) {
				New-Item -ItemType directory -Path $folder
			}
		}

		$string = @"
'use strict';

angular.module('$appName')
  .controller('$controllerName', function (`$scope) {
      `$scope.easy = false;
  });
"@
		$string | out-file "$filePath"
	}
	
	###########################################################################
	# Create the script reference in index.html
	if($createScriptRef)
	{
		# Update Index File		
		$scriptIncludeTag = "    <script src=`"scripts/" + $scriptFolderName + "/" + $value.replace("\", "/") + ".js`"></script>"
				
		if(!(Select-String -Simple $scriptIncludeTag $indexPath))
		{
			$foundAppJs = $false
			$addedLine = $false
			
			(Get-Content $indexPath) | % {
				if(!$addedLine)
				{
					if(!($foundAppJs))
					{
						if ($_ -match "app.js") 
						{
							$foundAppJs = $true
						}
					}
					else
					{
						if (!($_ -match "script")) 
						{
							$scriptIncludeTag
							$addedLine = $true
						}
					}
				}
				$_
			} | Set-Content $indexPath
		}
	}
	
	###########################################################################
	# Create a view
	if($createView)
	{	
		$filePath = [System.String]::Concat($solutionDir, '\', "app\views\" + $value + ".html")

		if ((Test-Path $filePath)) {
			clear-content "$filePath"
		}
		else {
			$folder = Split-Path -parent "$filePath"
			if(!(Test-Path $folder)) {
				New-Item -ItemType directory -Path $folder
			}
		}

		$string = @"
<h1>This is the $value view.</h1>
"@
		$string | out-file "$filePath"
	}
	
	###########################################################################
	# Create A route in the app.js file
	if($createRoute)
	{	
		$route1 = "      .when('" + $value.replace("\", "/") + "', {"
		$route2 = "        templateUrl: 'views/" + $value.replace("\", "/") + ".html',"
		$route3 = "        controller: '$controllerName'"
		$route4 = "      })"
				
		if(!(Select-String -Simple $route1 $appPath))
		{
			$foundOtherwise = $false
			
			(Get-Content $appPath) | % {
				if(!($foundOtherwise))
				{
					if ($_ -match "otherwise") 
					{
						$foundOtherwise = $true
						$route1
						$route2
						$route3
						$route4
					}
				}
				$_
			} | Set-Content $appPath
		}
	}
	
	###########################################################################
	# Create a directive
	if($createDirective)
	{	
		$filePath = [System.String]::Concat($solutionDir, '\', "app\scripts\directives\" + $value + ".js")

		# Create Controller File
		if ((Test-Path $filePath)) {
			clear-content "$filePath"
		}
		else {
			$folder = Split-Path -parent "$filePath"
			if(!(Test-Path $folder)) {
				New-Item -ItemType directory -Path $folder
			}
		}

		$string = @"
'use strict';

angular.module('$appName')
  .directive('$fileName', function () {
    return {
      template: '<div></div>',
      restrict: 'E',
      link: function postLink(scope, element, attrs) {
        element.text('this is the $fileName directive');
      }
    };
  });
"@
		
		$string | out-file "$filePath"
	}
	
	###########################################################################
	# Create a filter
	if($createFilter)
	{	
		$filePath = [System.String]::Concat($solutionDir, '\', "app\scripts\filters\" + $value + ".js")

		# Create Controller File
		if ((Test-Path $filePath)) {
			clear-content "$filePath"
		}
		else {
			$folder = Split-Path -parent "$filePath"
			if(!(Test-Path $folder)) {
				New-Item -ItemType directory -Path $folder
			}
		}

		$string = @"
'use strict';

angular.module('$appName')
  .filter('$fileName', function () {
    return function (input) {
      return '$fileName filter: ' + input;
    };
  });
"@
		
		$string | out-file "$filePath"
	}
	
	###########################################################################
	# Create a service
	if($createService)
	{	
		$filePath = [System.String]::Concat($solutionDir, '\', "app\scripts\services\" + $value + ".js")

		# Create Controller File
		if ((Test-Path $filePath)) {
			clear-content "$filePath"
		}
		else {
			$folder = Split-Path -parent "$filePath"
			if(!(Test-Path $folder)) {
				New-Item -ItemType directory -Path $folder
			}
		}

		$string = @"
'use strict';

angular.module('$appName')
  .factory('$fileName', function () {
    // Service logic
    // ...

    var meaningOfLife = 42;

    // Public API here
    return {
      someMethod: function () {
        return meaningOfLife;
      }
    };
  });
"@
		
		$string | out-file "$filePath"
	}
}