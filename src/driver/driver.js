'use strict';

require('dotenv').config();
const io = require('socket.io-client');
const port = process.env.PORT || 3333;
const host = `http://localhost:${port}`;
const driverConnection = io.connect(`${host}/caps`);

driverConnection.emit('getall');

driverConnection.on('pickup', pickupPackage);

function pickupPackage(message) {
  pickedUp(message);
  delivered(message);
}

async function pickedUp(message) {
  await setTimeout(() => {
    driverConnection.emit('in-transit-ready', message);
    console.log('DRIVER: picked up', message.payload.orderID);
  }, 1000);
}

async function delivered(message) {
  await setTimeout(() => {
    driverConnection.emit('delivered-ready', message);
    console.log('DRIVER: delivered', message.payload.orderID);
  }, 3000);
}

module.exports = { pickedUp, delivered };