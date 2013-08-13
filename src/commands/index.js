var InitializeCommand = require('./init');

function HatCommands(dir) {
  Object.defineProperties(this, {
    initialize: { value: new InitializeCommand(dir), enumerable: true }
  });
};

module.exports = HatCommands;