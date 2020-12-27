
'use strict';

require('dotenv').config();
const uuid = require('uuid').v4;
const port = process.env.PORT || 3333;
const io = require('socket.io')(port);
const logEvent = require('./log-event');
const queue = {
  deliveries: {}};

const capsSystem = io.of('/caps');

io.on('connection', (socket) => {
  console.log('Connected to CAPS', socket.id);
});

capsSystem.on('connection', (socket) => {


  socket.on('join', room => {
    console.log('Joining vendor room with ID:', room);
    socket.join(room);
  });

  socket.on('pickup-ready', (payload) => {
    logEvent('pickup', payload);
    const id = uuid();
    queue.deliveries[id] = payload;
    socket.emit('added');
    capsSystem.emit('pickup', {id,payload});
  });

  socket.on('in-transit-ready', (message) => {
    logEvent('in-transit', message);
    capsSystem.to(message.payload.storeID).emit('in-transit', message);
  });

  socket.on('delivered-ready', (message) => {
    logEvent('delivered', message);
    capsSystem.to(message.payload.storeID).emit('delivered', message);
  });

  socket.on('getall', () => {
    console.log('GETALL was called');
    // 1. loop thorugh all of the keys in the deliveries queue
    Object.keys(queue.deliveries).forEach(id => {
      // 2. for each id, emit 'delivered' with the id and payload
      socket.emit('delivered', {id, payload: queue.deliveries[id]});
    });
  });

  // if we get the 'received' message, then we know that the vendor got the delivery notification so we don't need to tell them again. Delete it from the queue
  socket.on('received', message => {
    console.log('CAPS system heard RECEIVED', message);
    delete queue.deliveries[message.id];
  });
});



module.exports = { logEvent };
