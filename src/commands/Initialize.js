"use strict";

var prompt = require('prompt')
  , pathUtil = require('path')
  , nconf = require('nconf')
  ;

function Initialize(dir) {
  this.rootDir = dir;
}

Initialize.prototype.setup = function () {
  var self = this;
  var configPath = self.rootDir + "/hat.json";
  var hat = nconf.file(configPath);

  hat.set('root', self.rootDir);
  hat.set('templates', "");
  hat.set('useModules', true);

  prompt.start();
  prompt.get({
    properties: {
      angularApp: {
        message: "Angular app name",
        required: true
      },
      angularPath: {
        message: "Angular app path from root",
        required: true
      }
    }
  }, function (err, result) {
    var root = hat.get('root');
    hat.set('angularApp', result.angularApp);

    var angularPath = result.angularPath;
    if (angularPath.indexOf("/", 0) !== 0) {
      angularPath = "/" + angularPath;
    } else {
      hat.set('angularPath', result.angularPath);
    }

    var angularAbsolutePath = pathUtil.join(self.rootDir, result.angularPath);
    hat.set('angularAbsPath', angularAbsolutePath);

    hat.save(function (err) {
      if (err) {
        throw err;
      } else {
        console.log('Hat was configured successfully at: ' + configPath)
      }
    })
  });

};


module.exports = Initialize;
