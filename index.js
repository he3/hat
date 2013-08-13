var fs = require('fs')
  , program = require('commander')
  ; HatCommands = require("./src/commands");

var hatCommands = new HatCommands(__dirname);

if (fs.exists('./hat.config'), function (exists) {
  if (!exists) {
    console.error('Please run the init command, no hat.json file exists');
    process.exit(-1);
  }
})

program
  .command('init')
  .description("Initializes hat and sets up the hat.config file")
  .action(function () {
    hatCommands.initialize().run(__dirname);
  });


program
  .version('0.0.1')
  .parse(process.argv);

if (!program.args.length) {
  program.help();
}

module.exports = program;