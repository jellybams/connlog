var express = require('express'),
  app = express(),
  http = require('http'),
  bodyParser = require('body-parser'),
  facet = require('facet-platform')();

facet
  .useModules({
    'connlog': require('./lib/connlog')
  })
  .setModuleOptions({
    dbServer: 'mongodb://connlog:loadtestwoo@ds053130.mongolab.com:53130/connlog'
  })
  .init(app);

app.use(bodyParser.json());
app.set('port', process.env.PORT || 9393);

app.use( '/api/v1', facet.getModule('connlog').bindRoutes(express.Router()));

http.createServer(app).listen(app.get('port'), function(){
  console.log('connlog server listening on port ' + app.get('port'));
});
