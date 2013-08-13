var Hat = require("../Hat.js")
  , fs = require("fs");

describe('Hat Command Line Arguments', function () {
  var hat = new Hat('./test');

  beforeEach(function(done){
    if(fs.existsSync('./test/hat.json')){
      fs.unlink('./test/hat.json')
      done();
    } else {
      done();
    }
  });

  describe('No arguments, and no hat.config', function(){
    it("should throw an exception", function(){
      fs.existsSync('./test/hat.json').should.be.false;
      (function(){
        hat.run([]);
        should.fail("we should've thrown an exception.");
      }).should.throw;
    });
  });

  describe('-h, Help Documentation', function () {
    it('should be displayed when no arguments are given to the command line', function () {
      fs.existsSync('./test/hat.json').should.be.false;


    });
  });
});