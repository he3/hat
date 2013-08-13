var util = require('util');

var AbstractError = function (msg, constr) {
  Error.captureStackTrace(this, constr || this)
  this.message = msg || 'Error';
}

util.inherits(AbstractError, Error);
AbstractError.prototype.name = 'Abstract Error';

// Config File Error
var ConfigFileError = function (msg) {
  ConfigFileError.super_.call(this, msg, this.constructor);
}
util.inherits(ConfigFileError, AbstractError);
ConfigFileError.prototype.message = "hat.config file not set";

module.exports = {
  ConfigFile: ConfigFileError
};