/* eslint-disable no-unused-expressions */

const Renter = require('../../dst/models/renter');
const expect = require('chai').expect;

describe('renter', () => {
  describe('constructor', () => {
    it('should create a new renter', (done) => {
      const r = new Renter({
        name: 'Chyld',
        money: 2000,
      });
      r.validate(err => {
        expect(err).to.be.undefined;
        expect(r.name).to.equal('Chyld');
        expect(r.money).to.equal(2000);
        expect(r.apartment).to.be.null;
        expect(r.complaints).to.equal(0);
        done();
      });
    });
    it('should not create a new renter, given no name', (done) => {
      const r = new Renter({
        money: 2000,
      });
      r.validate(err => {
        expect(err).to.be.ok;
        done();
      });
    });
    it('should not create a new renter, given no money', (done) => {
      const r = new Renter({
        name: 'Chyld',
      });
      r.validate(err => {
        expect(err).to.be.ok;
        done();
      });
    });
    it('should not create a new renter, name less than 2 characters', (done) => {
      const r = new Renter({
        name: 'B',
        money: 2000,
      });
      r.validate(err => {
        expect(err).to.be.ok;
        done();
      });
    });
    it('should not create a new renter, not enough money', (done) => {
      const r = new Renter({
        name: 'Bo',
        money: 500,
      });
      r.validate(err => {
        expect(err).to.be.ok;
        done();
      });
    });
  });
});
