
'use strict';

//const event = require('./src/lib/event');
const util = require('util');
const port = process.env.PORT || 3333;
const io = require('socket.io')(port);

const vendorSystem = io.of('/vendor-system');
const driverSystem = io.of('/driver-system');

io.on('connection',  (socket) => {
  console.log('Connected to CAPS', socket.id);
});

vendorSystem.on('connection', (socket) => {
  console.log('Connected to vendor system', socket.id);
  socket.on('pickup-ready', (payload) => {
    logEvent('pickup', payload);
    driverSystem.emit('pickup', payload);
  });
  
});

driverSystem.on('connection', (socket) => {
  console.log('Connected to driver system', socket.id);
  socket.on('in-transit-ready', (payload) => {
    logEvent('in-transit', payload);
    vendorSystem.emit('in-transit', payload);
  });
  
  socket.on('delivered-ready', (payload) => {
    logEvent('delivered', payload);
    vendorSystem.emit('delivered', payload);
  });
    
});

function logEvent(eventName, payload) {
  var date = new Date(Date.now());
  console.log(`EVENT: { event: ${eventName}, time: ${date.toString()}, payload: ${util.inspect(payload, { showHidden: false, depth: null })}}`);
}

module.exports = {logEvent};