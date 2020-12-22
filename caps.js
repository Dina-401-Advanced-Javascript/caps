
'use strict';

const event = require('./event');
const util = require('util');

//require the files that will be listening for events
require('./driver');
require('./vendor');

event.on('pickup-ready', (payload) => {
  logEvent('pickup', payload);
  event.emit('pickup', payload);
});

event.on('in-transit-ready', (payload) => {
  logEvent('in-transit', payload);
  event.emit('in-transit', payload);
});

event.on('delivered-ready', (payload) => {
  logEvent('delivered', payload);
  event.emit('delivered', payload);
});

function logEvent(eventName, payload) {
  var date = new Date(Date.now());
  console.log(`EVENT: { event: ${eventName}, time: ${date.toString()}, payload: ${util.inspect(payload, { showHidden: false, depth: null })}}`);
}

module.exports = {logEvent};