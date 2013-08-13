var Hat = require("../../Hat.js")
  , fs = require('fs')
  ;

describe('InitializeCommand', function() {
  var hat = new Hat("./test/");
  var hatConfigPath = './test/hat.json';

  describe('No hat.config is present', function(){
//    it("should throw an error", function(){
//      it("should throw an exception", function(){
//        if(fs.existsSync(hatConfigPath)){
//          fs.unlink(hatConfigPath);
//        }
//        fs.existsSync(hatConfigPath).should.be.false;
//        (function(){
//          hat.run([]);
//          should.fail("we should've thrown an exception.");
//        }).should.throw;
//      });
//    });
  });

  describe('default init command', function(){
    it('should create a hat.json with default value', function(){
      fs.existsSync(hatConfigPath).should.be.false;
      hat.run(['init']);
      fs.existsSync(hatConfigPath).should.be.true;
    });
  });
});