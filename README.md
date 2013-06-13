hat
===

Powershell script to do Yeoman like tasks in Visual Studio 2012. (Only tested in VS2012).

Supports creating angular templates for controller, route, directive, filter, view, and service.

##Install
Create the NuGet_profile.ps1 that Package Manager Console uses.

From the Package Manager Console in Visual Studio [2012]

```
PM> mkdir -force (split-path $profile)
PM> notepad $profile
# Copy the content of NuGet_profile.ps1 to the notepad that just opened.
```

##Requirements 
Web structure

In package manager console, you must be in the root of the website and the site is in the Yeoman structure.

```
$/
  +app
    +scripts
      +controllers
      +directives
      +filters
      +services
    -app.js
  +views
```

This is the structure that Yeoman creates.

Dont worry if folders do not exist, hat will make them.


##Usage - from Package Manager Console

```
PM> hat route admin/users
```

Valid commands are: controller, route, directive, filter, view, and service.

