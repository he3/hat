var fs = require('fs')
  , program = require('commander')
  , HatCommands = require("./src/commands")
  , ApplicationError = require('./src/config/ApplicationErrors')
  ;

function Hat(dir) {
  Object.defineProperties(this, {
    workingDir: { value: dir, enumerable: true },
    commands: { value: new HatCommands(dir), enumerable: true }
  });
};

Hat.prototype.run = function (args) {
  var self = this;
  args = args || [];

  program
    .version('0.0.1')

  program
    .command('init')
    .description("Initializes hat and sets up the hat.json file")
    .action(function () {
      console.log("Setting up the hat.json file in the directory: " + self.workingDir);
      self.commands.initialize.run();
    });

  program.parse(args);
}

module.exports = Hat;
