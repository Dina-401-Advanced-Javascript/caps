'use strict';

const logEvent = require('../log-event');
const faker = require('faker');

process.env.STORE_NAME = 'DFA';
process.env.STORE_ID = 'DFFFFF';

let consoleSpy;

beforeEach(() => {
  // Attach to the console
  consoleSpy = jest.spyOn(console, 'log').mockImplementation();
});

afterEach(() => {
  // put the console back
  consoleSpy.mockRestore();
});
describe('CAPS', () => {
  var order = {
    storeName: process.env.STORE_NAME,
    storeID: process.env.STORE_ID,
    orderID: faker.random.uuid(),
    name: faker.name.findName(),
    address: faker.address.streetAddress() + ', ' + faker.address.city() + ', ' + faker.address.stateAbbr() + ' ' + faker.address.zipCode(),
  };

  it('can log any event', () => {
    console.log(order);
    logEvent('in-transit', order);
    expect(consoleSpy).toHaveBeenCalled();
  });

});