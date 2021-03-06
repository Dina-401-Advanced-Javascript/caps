'use strict';
const vendor = require('../vendor');
const faker = require('faker');

process.env.STORE_NAME = 'DFA';
process.env.STORE_ID = 'DFFFFF';

describe('VENDOR', () => {
  let consoleSpy;
  var order = {
    storeName: process.env.STORE_NAME,
    storeID: process.env.STORE_ID,
    orderID: faker.random.uuid(),
    name: faker.name.findName(),
    address: faker.address.streetAddress() + ', ' + faker.address.city() + ', ' + faker.address.stateAbbr() + ' ' + faker.address.zipCode(),
  };
  
  beforeEach(() => {
    // Attach to the console
    consoleSpy = jest.spyOn(console, 'log').mockImplementation();
  });
  
  afterEach(() =>{
    // put the console back
    consoleSpy.mockRestore();
  });
  
  it('Can send a pickup order', () => {
    vendor.orderReady();
    //we expect caps.js to have logged this event in less than a second.
    setTimeout(() => { expect(consoleSpy).toHaveBeenCalled(); }, 500);
  });

  it('Can thank driver', () => {
    var message = {
      id: process.env.STORE_ID,
      payload: order};
    vendor.thankDriver(message);
    setTimeout(() => { expect(consoleSpy).toHaveBeenCalled(); }, 1000);
  });

});