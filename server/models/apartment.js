/* eslint-disable no-use-before-define */
import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const schema = new Schema({
  name: { type: String, required: true, validate: { validator: duplicateAptValidator } },
  sqft: { type: Number, min: 500, max: 2500 },
  rooms: { type: Number, min: 1, max: 4 },
  rent: { type: Number, min: 1000 },
  deposit: { type: Number, min: 50 },
  collectedRent: { type: Number, default: 0 },
  rentDue: { type: Number },
  lateFee: { type: Number, min: 10 },
  renter: { type: mongoose.Schema.ObjectId, ref: 'Renter', default: null },
});

function duplicateAptValidator(name, cb) {
  this.model('Apartment').find({ name }, (err, apartments) => {
  // when .find returns something, that is called 'yielding'
    cb(!(apartments.length));
  });
}

module.exports = mongoose.model('Apartment', schema);
