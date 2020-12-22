'use strict';

require('dotenv').config();
var faker = require('faker');
const io = require('socket.io-client');
const port = process.env.config || 3333;
const host = `http://localhost:${port}`;
const vendorConnection = io.connect(`${host}/caps`);
vendorConnection.emit('join', process.env.STORE_ID);

vendorConnection.on('delivered', thankDriver);

function thankDriver(payload) {
  console.log('VENDOR: Thank you for delivering', payload.orderID);
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

setInterval(orderReady, 5000);

module.exports = { thankDriver, orderReady };