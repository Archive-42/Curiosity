var EventEmitter = require('events').EventEmitter;
var Websocket = require('ws');
var Utils = require('../utilities.js');
var util = require('util');
var _  = {assign: require('lodash.assign')};
var signRequest = require('../../lib/request_signer').signRequest;

/**
 * Create a new connection to a websocket feed
 * @param productIDs {array} The GDAX products to listen to. Default: ['BTC-USD']
 * @param websocketURI {string} Optional. The websocker URL. Default: The official GDAX feed.
 * @param auth {object} Optional. An object containing your API ket details (key, secret & passphrase)
 */
var WebsocketClient = function(productIDs, heartbeat, websocketURI, auth) {
  var self = this;
  self.productIDs = Utils.determineProductIDs(productIDs);
  self.websocketURI = websocketURI || 'wss://ws-feed.gdax.com';
  if (auth && !(auth.secret && auth.key && auth.passphrase)) {
    throw new Error('Invalid or incomplete authentication credentials. You should either provide all of the secret, key and passphrase fields, or leave auth null');
  }
  self.auth = auth || {};
  self.heartbeat = heartbeat || false;
  EventEmitter.call(self);
  self.connect();
};

util.inherits(WebsocketClient, EventEmitter);

_.assign(WebsocketClient.prototype, new function() {
  var prototype = this;

  prototype.connect = function() {
    var self = this;

    if (self.socket) {
      self.socket.close();
    }

    self.socket = new Websocket(self.websocketURI);

    self.socket.on('message', self.onMessage.bind(self));
    self.socket.on('open', self.onOpen.bind(self));
    self.socket.on('close', self.onClose.bind(self));
    self.socket.on('error', self.onError.bind(self));
  };

  prototype.disconnect = function() {
    var self = this;

    if (!self.socket) {
      throw "Could not disconnect (not connected)"
    }

    self.socket.close();
  };

  prototype.onOpen = function() {
    var self = this;
    self.emit('open');

    var subscribeMessage = {
      type: 'subscribe',
      product_ids: self.productIDs
    };

    // Add Signature
    if (self.auth.secret) {
      var sig = signRequest(self.auth, 'GET', '/users/self');
      subscribeMessage.signature = sig.signature
      subscribeMessage.key = sig.key
      subscribeMessage.passphrase = sig.passphrase
      subscribeMessage.timestamp = sig.timestamp
    }

    self.socket.send(JSON.stringify(subscribeMessage));

    // Add heartbeat option
    if(self.heartbeat) {    
      var heartbeatMessage = {
        type: 'heartbeat',
        on: true 
      };

      // Add Signature
      if (self.auth.secret) {
        var sig = signRequest(self.auth, 'GET', '/users/self');
        heartbeatMessage.signature = sig.signature
        heartbeatMessage.key = sig.key
        heartbeatMessage.passphrase = sig.passphrase
        heartbeatMessage.timestamp = sig.timestamp
      }

      self.socket.send(JSON.stringify(heartbeatMessage));
    }

    // Set a 30 second ping to keep connection alive
    self.pinger = setInterval(function() {
      self.socket.ping("keepalive");
    }, 30000);
    
  };

  prototype.onClose = function() {
    var self = this;
    clearInterval(self.pinger);
    self.socket = null;
    self.emit('close');
  };

  prototype.onMessage = function(data) {
    var self = this;
    self.emit('message', JSON.parse(data));
  };

  prototype.onError = function(err) {
    var self = this;

    if (!err) {
      return;
    }

    if (err.message === 'unexpected server response (429)') {
      err = new Error('You are connecting too fast and are being throttled! Make sure you subscribe to multiple books on one connection.');
      throw err;
    }

    self.emit('error', err);
  };
});

module.exports = exports = WebsocketClient;
