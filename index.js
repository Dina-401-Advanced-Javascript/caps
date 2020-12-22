'use strict';

require('dotenv').config();
const io = require('socket.io-client');
const port = process.env.config || 3333;
const host = `http://localhost:${port}`;

const capsConnection = io.connect(host);
// const dsConnection = io.connect(`${host}/digestive-system`);
//const driverConnect = io.connect(`${host}/driver-system`);

//healthConnect.emit('cold', { level: 4 });

// dsConnection.emit('hungry', { level: 10 });

// brainConnection.emit('light', { level: 90 });

// brainConnection.emit('smell', { scent: 'freshly cut grass' });