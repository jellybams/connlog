var ModelSchema = require('./ConnectionSchema'),
  CoreSchema = require('facet-core').CoreSchema;

function ConnectionModel(options) {
  var ConnectionSchema = new ModelSchema(options, new CoreSchema(options)),
  	ConnectionModel = options.db.model('Connection', ConnectionSchema);

  return ConnectionModel;
};


module.exports = ConnectionModel;
