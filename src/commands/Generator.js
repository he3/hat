"use strict";
var ModuleGenerator = require("../generators/Modules");

function Generator() {

};

Generator.prototype.setup = function (kind) {
  if (kind) {
    switch (kind.toLowerCase()) {
      case "module":
        var moduleGenerator = new ModuleGenerator();
        moduleGenerator.run();
        break;
      // Soon
      case "controller":
      case "form":
      case "directive":
      case "filters":
      case "services":
        break;
    }
  } else {
    console.error("the 'kind' of generator is required");
  }
};

module.exports = Generator;