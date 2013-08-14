"use strict";

var program = require('commander')
  , Initialize = require('./Initialize')
  , Generator = require('./Generator')
  , colors = require('colors')
  ;

function Commands(dir) {
  Object.defineProperties(this, {
    rootDir: { value: dir, enumerable: true },
    init: { value: new Initialize(dir), enumerable: true },
    g: { value: new Generator(), enumerable: true }
  });
}

Commands.prototype.register = function () {
  var self = this;
  program
    .command('init')
    .description('Configures hat for your project and setups up the default configuration settings.'.green)
    .action(function () {
      console.log("seting up configuration")
      self.init.setup();
    });

  program
    .command('setup')
    .description("Sets up an angular project with all the dependencies".green)
    .action(function () {
      console.log("setting up... beep");
    });

  program
    .command("g <kind>")
    .description("Kind:".green + " [module, controller, form, directives, filters, services]".white)
    .action(function (kind) {
      self.g.setup(kind);
    });

  program
    .command("scaffold <kind>")
    .description("kind:".green + " [model, form]".white)
    .action(function (kind) {
      console.log(kind);
    });
}

module.exports = Commands;