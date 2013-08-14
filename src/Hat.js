"use strict";

var fs = require('fs')
  , program = require('commander')
  , Command = require('./commands')
  , path = require('path')
  ;


function Hat() {
  Object.defineProperties(this, {
    Commands: { value: new Command(path.resolve()), enumerable: true }
  });
};

Hat.prototype.run = function (args) {
  var self = this;
  program.version(require('../package.json').version);

  var command = new Command(path.resolve());
  command.register();

  program.parse(args);
}

module.exports = Hat;

