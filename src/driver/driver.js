'use strict';

require('dotenv').config();
const io = require('socket.io-client');
const port = process.env.config || 3333;
const host = `http://localhost:${port}`;
const driverConnection = io.connect(`${host}/driver-system`);

driverConnection.on('pickup', pickupPackage);

function pickupPackage(payload) {
  pickedUp(payload);
  delivered(payload);
}

async function pickedUp(payload) {
  await setTimeout(() => {
    driverConnection.emit('in-transit-ready', payload);
    console.log('DRIVER: picked up', payload.orderID);
  }, 1000);
}

async function delivered(payload) {
  await setTimeout(() => {
    driverConnection.emit('delivered-ready', payload);
    console.log('DRIVER: delivered', payload.orderID);
  }, 3000);
}

module.exports = { pickedUp, delivered };