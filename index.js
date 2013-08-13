var Hat = require('./Hat')
  , ApplicationError = require('./src/config/ApplicationErrors')
  ;

var hat = new Hat(__dirname);
try {
  hat.run(process.argv);
} catch(e){
  if (e instanceof  ApplicationError.ConfigFile){
    console.error("Please run 'hat init', to setup the hat.config file");
  }
}
