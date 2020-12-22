'use strict';

require('dotenv').config();
var event = require('./event');

event.on('pickup', pickupPackage);

function pickupPackage(payload) {
    
  setTimeout(() => { 
    event.emit('in-transit-ready', payload); 
    console.log('DRIVER: picked up', payload.orderID);
  }, 1000);

  setTimeout(() => { 
    event.emit('delivered-ready', payload); 
    console.log('DRIVER: delivered', payload.orderID);
  }, 3000);
}