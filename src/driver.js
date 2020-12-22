'use strict';

require('dotenv').config();
var event = require('./lib/event');

event.on('pickup', pickupPackage);

function pickupPackage(payload) {

  pickedUp(payload);

  delivered(payload);
}

async function pickedUp(payload){
  await setTimeout(() => { 
    event.emit('in-transit-ready', payload); 
    console.log('DRIVER: picked up', payload.orderID);
  }, 1000);
    
}

async function delivered(payload){
  await setTimeout(() => { 
    event.emit('delivered-ready', payload); 
    console.log('DRIVER: delivered', payload.orderID);
  }, 3000);
}

module.exports = {
  pickedUp, 
  delivered,
};