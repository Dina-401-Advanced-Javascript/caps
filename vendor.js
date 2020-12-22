'use strict';

require('dotenv').config();
var faker = require('faker');
var event = require('./event');

event.on('delivered',thankDriver);

function thankDriver(payload)
{
  console.log('VENDOR: Thank you for delivering', payload.orderID);
}

function orderReady() {
  var order = {
    store: process.env.STORE,
    orderID:faker.random.uuid(),
    name: faker.name.findName(),
    address: faker.address.streetAddress() + ', ' + faker.address.city() + ', ' + faker.address.stateAbbr() + ' ' + faker.address.zipCode()};
  event.emit('pickup-ready',order);
}

setInterval(orderReady, 5000);

module.exports = thankDriver;