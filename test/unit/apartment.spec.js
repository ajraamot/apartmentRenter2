/* eslint-disable no-unused-expressions, no-underscore-dangle */

const Apartment = require('../../dst/models/apartment');
const Renter = require('../../dst/models/renter');
const expect = require('chai').expect;
const sinon = require('sinon');

describe('apartment', () => {
  beforeEach(() => {
    sinon.stub(Apartment, 'find').yields(null, []);
  });
  afterEach(() => {
    Apartment.find.restore();
  });
  describe('constructor', () => {
    it('should create a new apartment', done => {
      const a = new Apartment({
        name: 'a1',
        sqft: 1000,
        rooms: 2,
        rent: 1200,
        deposit: 250,
        lateFee: 15,
      });
      a.validate(err => {
        expect(err).to.be.undefined;
        expect(a.name).to.equal('a1');
        expect(a.sqft).to.equal(1000);
        expect(a.rooms).to.equal(2);
        expect(a.rent).to.equal(1200);
        expect(a.deposit).to.equal(250);
        expect(a.lateFee).to.equal(15);
        expect(a.collectedRent).to.equal(0);
        expect(a.renter).to.be.null;
        done();
      });
    });
    it('should not create a new apartment, square feet less than 500', done => {
      const a = new Apartment({
        name: 'a1',
        sqft: 200,
        rooms: 2,
        rent: 1200,
        deposit: 250,
        lateFee: 15,
      });
      a.validate(err => {
        expect(err).to.be.ok;
        done();
      });
    });
    it('should not create a new apartment, square feet greater than 2500', done => {
      const a = new Apartment({
        name: 'a1',
        sqft: 3000,
        rooms: 2,
        rent: 1200,
        deposit: 250,
        lateFee: 15,
      });
      a.validate(err => {
        expect(err).to.be.ok;
        done();
      });
    });
    it('should not create a new apartment, rooms less than 1', done => {
      const a = new Apartment({
        name: 'a1',
        sqft: 500,
        rooms: 0,
        rent: 1200,
        deposit: 250,
        lateFee: 15,
      });
      a.validate(err => {
        expect(err).to.be.ok;
        done();
      });
    });
    it('should not create a new apartment, rooms greater than 4', done => {
      const a = new Apartment({
        name: 'a1',
        sqft: 500,
        rooms: 5,
        rent: 1200,
        deposit: 250,
        lateFee: 15,
      });
      a.validate(err => {
        expect(err).to.be.ok;
        done();
      });
    });
    it('should not create a new apartment, rent less than 1000', done => {
      const a = new Apartment({
        name: 'a1',
        sqft: 500,
        rooms: 2,
        rent: 500,
        deposit: 250,
        lateFee: 15,
      });
      a.validate(err => {
        expect(err).to.be.ok;
        done();
      });
    });
    it('should not create a new apartment, deposit less than 50', done => {
      const a = new Apartment({
        name: 'a1',
        sqft: 500,
        rooms: 2,
        rent: 1500,
        deposit: 25,
        lateFee: 15,
      });
      a.validate(err => {
        expect(err).to.be.ok;
        done();
      });
    });
    it('should not create a new apartment, late fee less than 10', done => {
      const a = new Apartment({
        name: 'a1',
        sqft: 500,
        rooms: 2,
        rent: 1500,
        deposit: 100,
        lateFee: 5,
      });
      a.validate(err => {
        expect(err).to.be.ok;
        done();
      });
    });
    it('should not create a new apartment, duplicate name', done => {
      Apartment.find.yields(null, [{ name: 'a1' }]);
      const a = new Apartment({
        name: 'a1',
        sqft: 500,
        rooms: 2,
        rent: 1500,
        deposit: 100,
        lateFee: 15,
      });
      a.validate(err => {
        expect(err).to.be.ok;
        sinon.assert.calledWith(Apartment.find, { name: 'a1' });
        done();
      });
    });
  });
  describe('#lease', () => {
    it('should lease a new apartment', done => {
      const a = new Apartment({
        name: 'a2',
        sqft: 1000,
        rooms: 2,
        rent: 1200,
        deposit: 250,
        lateFee: 15,
      });
      const r = new Renter({
        name: 'r2',
        money: 1000,
      });
      a.lease(r, 6);
      a.validate(err1 => {
        expect(err1).to.be.undefined;
        expect(a.collectedRent).to.equal(250);
        expect(a.rentDue).to.equal(6);
        expect(a.renter).to.equal(r._id);
        r.validate(err2 => {
          expect(err2).to.be.undefined;
          expect(r.money).to.equal(1000 - 250);
          expect(r.apartment).to.equal(a._id);
          done();
        });
      });
    });
  });
});
