
'use strict';

//const event = require('./src/lib/event');
const util = require('util');
const port = process.env.PORT || 3333;
const io = require('socket.io')(port);
const logEvent = require('./log-event');

const capsSystem = io.of('/caps');
//const driverSystem = io.of('/driver-system');

io.on('connection',  (socket) => {
  console.log('Connected to CAPS', socket.id);
});

capsSystem.on('connection', (socket) => {
  
  socket.on('join', room => {
    console.log('registered as', room);
    socket.join(room);
  });

  socket.on('pickup-ready', (payload) => {
    logEvent('pickup', payload);
    capsSystem.emit('pickup', payload);
  });

  socket.on('in-transit-ready', (payload) => {
    logEvent('in-transit', payload);
    capsSystem.to(payload.storeID).emit('in-transit', payload);
  });
  
  socket.on('delivered-ready', (payload) => {
    logEvent('delivered', payload);
    capsSystem.to(payload.storeID).emit('delivered', payload);
  });
    
});



module.exports = {logEvent};
