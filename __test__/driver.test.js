'use strict';
const driver = require('../src/driver/driver');
const faker = require('faker');

describe('DRIVER', () => {

  let consoleSpy;
  var order = {
    store: process.env.STORE,
    orderID: faker.random.uuid(),
    name: faker.name.findName(),
    address: faker.address.streetAddress() + ', ' + faker.address.city() + ', ' + faker.address.stateAbbr() + ' ' + faker.address.zipCode(),
  };

  beforeEach(() => {
    // Attach to the console
    consoleSpy = jest.spyOn(console, 'log').mockImplementation();
  });

  afterEach(() => {
    // put the console back
    consoleSpy.mockRestore();
  });

  it('Can pickup an order', () => {
    driver.pickedUp(order);
    setTimeout(() => { expect(consoleSpy).toHaveBeenCalled(); }, 1000);
  });

  it('Can deliver an order', () => {
    driver.delivered(order);
    setTimeout(() => { expect(consoleSpy).toHaveBeenCalled(); }, 3000);
  });

});