var express = require('express'),
  app = express(),
  http = require('http'),
  bodyParser = require('body-parser'),
  facet = require('facet-platform')();

// set up facet modules
facet
  .useModules({
    'connlog': require('./connlog'),
  })
  .setModuleOptions({
    dbServer: 'mongodb://connlog:loadtestwoo@ds053130.mongolab.com:53130/connlog'
  })
  .init(app);

app.use(bodyParser.json());
app.set('port', process.env.PORT || 9393);

// route handlers
// users/groups/auth
app.use( '/api/v1', facet.getModule('connlog').bindRoutes( express.Router(), {
  routes: [{
    routeBase: '/connections',
    resourceReference: 'Connections'
  }]
}));

http.createServer(app).listen(app.get('port'), function(){
  console.log('connlog server listening on port ' + app.get('port'));
});
