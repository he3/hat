var nconf = require('nconf'),
  fs = require('fs');

function InitializeCommand(dir) {
  Object.defineProperties(this, {
    workingDir: {value: dir, enumerable: true }
  })
}

InitializeCommand.prototype.run = function () {
  var self = this;

  var hatConfigPath = self.workingDir + "/hat.json";
  console.log(hatConfigPath);
  console.log(self);
  var defaultConfig = nconf.file(self.workingDir + '/src/config/config.json');
  var hatConfig = nconf.file(hatConfigPath);

  hatConfig.set('root', self.workingDir);
  hatConfig.set('templates', "");
  hatConfig.set('editVsFile', defaultConfig.get('editVsFile'));

  hatConfig.save(function (err) {
    if (err) {
      console.error(err);
    } else {
      fs.readFile(hatConfigPath, function (err, data) {
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