
var ConnectionSchema = function( options, CoreSchema ){

  var Schema = options.db.Schema;

  var ConnectionSchema = new CoreSchema({
    'conn_id': { type: String, required: 'The connection id is required.' },
    'date_created': { type: Date, default: Date.now }
  });

  return ConnectionSchema; 
};

module.exports = exports = ConnectionSchema;
