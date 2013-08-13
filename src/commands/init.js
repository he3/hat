var nconf = require('nconf'),
  fs = require('fs');

function InitializeCommand() {

}

InitializeCommand.prototype.run = function (rootDir) {
  var defaultConfig = nconf.file(rootDir + '/src/config/config.json');
  var hatConfig = nconf.file(rootDir + "/hat.config");

  hatConfig.set('root', rootDir);
  hatConfig.set('templates', "");
  hatConfig.set('editVsFile', defaultConfig.get('editVsFile'));

  hatConfig.save(function (err) {
    if (err) {
      console.error(err);
    } else {
      fs.readFile(rootDir + "/hat.config", function (err, data) {
        if (err) {
          console.error(err);
        } else {
          console.log("Success! hat.config file was saved successfully");
          console.log(JSON.parse(data));
        }
      });
    }
  });
};


module.exports = InitializeCommand;