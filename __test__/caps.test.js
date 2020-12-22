'use strict';

const caps = require('../caps');
const faker = require('faker');

describe('CAPS', () => {
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

  it('can log any event', () => {
    caps.logEvent('in-transit', order);
    expect(consoleSpy).toHaveBeenCalled();
  });
  
});