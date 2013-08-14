"use strict";

var nconf = require('nconf')
  , prompt = require('prompt')
  , fs = require('fs')
  , path = require('path')
  , Handlebars = require('handlebars').create();

function ModuleGenerator() {
}

ModuleGenerator.prototype.run = function () {
  var config = nconf.file(path.join(path.resolve(), "hat.json"));
  var templatePath = path.join(path.resolve() + "/src/templates/generators/modules/module.hat");
  var file = fs.readFileSync(templatePath);
  var template = Handlebars.compile(file.toString());

  prompt.start();
  prompt.get({
    properties: {
      name: {
        message: "Angular Module Name",
        required: true
      },
      path: {
        message: "Blank, or Relative Path inside of Angular App Directory"
      },
      fileName: {
        message: "File (module.js)",
        required: true
      }
    }
  }, function (err, result) {

    var dirPath = path.join(config.get('angularAbsPath'), result.path);
    if (!fs.existsSync(dirPath)) {
      fs.mkdirSync(dirPath);
    }

    var filepath = path.join(dirPath, result.fileName);
    if (fs.existsSync(filepath)) {
      //ToDo: Do some parsing
    } else {
      var renderedTemplate = template({ name: result.name });
      fs.writeFileSync(filepath, renderedTemplate);
      console.log("Success: ".green + filepath.white);
    }
  });
};

module.exports = ModuleGenerator;
