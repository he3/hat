var InitializeCommand = require('./init');

function HatCommands(){

}

HatCommands.prototype.initialize = function(){
  return new InitializeCommand();
}

module.exports = HatCommands;