'use strict';
class Queue{
  constructor(vendorID){
    this.vendorID = vendorID;
    this.deliveries = {};
  }
}
module.exports = Queue;