'use strict';
const Events = require('events');

const events = new Events(); // singleton that will be used everywhere

module.exports = events;