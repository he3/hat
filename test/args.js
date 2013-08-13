var hat = require("../index.js");

describe('Hat Command Line Arguments', function(){
  describe('-h, Help Documentation', function(){
    it('should be displayed when no arguments are given to the command line', function(){
      hat.parse();
      hat.args.length.should.empty;
    });
  });
});

