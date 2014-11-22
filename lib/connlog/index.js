"use strict";
var util = require('util'),
  Connection = require('./model/Connection'),
  ApiCore = require('facet-core').ApiCore;


var ConnectionAPI = function ( options ){
  console.log('running ConnectionAPI xtor');

  ConnectionAPI.super_.call(this, options);
  this.Model = new Connection( this.options );
};


util.inherits(ConnectionAPI, ApiCore);


ConnectionAPI.prototype.setupRouterManifest = function () {
  // update the router manifest 
  this.routerManifest
    .setApiEventType('connection')
    .setApiModelId('connectionId')
    .setRouteBase('/connections')
    .addRoutes([
      { verb: 'GET',    route: '',               emit: 'facet:connection:find'    },
      { verb: 'POST',   route: '',               emit: 'facet:connection:create'  },
      { verb: 'DELETE', route: '/:connectionId', emit: 'facet:connection:remove'  },
    ]);
};


ConnectionAPI.prototype.registerEvents = function () {  
  var _this = this;

  this.intercom.on('facet:connection:data', function handleConnectionData( data, nodeStack ) {
    data.then( function( connData ) {
      if( null === connData ){
        _this.intercom.emit('facet:response:error', 404, 'Connection(s) not found.');
      }
      else {
        _this.intercom.emit('facet:response:connection:data', connData);
      }
    },
    function( err ) {
      _this.intercom.emit('facet:response:error', 404, 'Error querying for product(s): ' + err.message);
    }).end();
  });
  this.intercom.on( 'facet:connection:find',     this.find.bind(this)    );
  this.intercom.on( 'facet:connection:create',   this.create.bind(this)  );
  this.intercom.on( 'facet:connection:remove',   this.remove.bind(this)  );
};


exports = module.exports = ConnectionAPI;
