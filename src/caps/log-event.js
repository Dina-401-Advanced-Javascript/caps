'use strict';
const util = require('util');

function logEvent(eventName, payload) {
  var date = new Date(Date.now());
  console.log(`EVENT: { event: ${eventName}, time: ${date.toString()}, payload: ${util.inspect(payload, { showHidden: false, depth: null })}}`);
}

module.exports = logEvent;