'use strict';

require('dotenv').config();
var faker = require('faker');
const io = require('socket.io-client');
const port = process.env.PORT || 3333;
const host = `http://localhost:${port}`;
const vendorConnection = io.connect(`${host}/caps`);

//join the room for this vendor by my store id
vendorConnection.emit('join', process.env.STORE_ID);

//emit get all in case there are deliveries waiting for this vendor when they reconnect.
vendorConnection.emit('getall', process.env.STORE_ID);

//when a package is delivered, thank the driver + emit 'received'
vendorConnection.on('delivered', thankDriver);

function thankDriver(message) {
  console.log('VENDOR: Thank you for delivering', message.payload.orderID);
  vendorConnection.emit('received', message);
}

function orderReady() {
  var order = {
    storeName: process.env.STORE_NAME,
    storeID: process.env.STORE_ID,
    orderID: faker.random.uuid(),
    name: faker.name.findName(),
    address: faker.address.streetAddress() + ', ' + faker.address.city() + ', ' + faker.address.stateAbbr() + ' ' + faker.address.zipCode(),
  };
  vendorConnection.emit('pickup-ready', order);
}

//every 5 seconds send out a pickup-ready event
setInterval(orderReady, 500);

module.exports = { thankDriver, orderReady };