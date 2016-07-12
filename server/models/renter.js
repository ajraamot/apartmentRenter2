import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const schema = new Schema({
  name: { type: String, required: true, minlength: 2 },
  money: { type: Number, required: true, min: 1000 },
  apartment: { type: mongoose.Schema.ObjectId, ref: 'Apartment', default: null },
  complaints: { type: Number, default: 0 },
});

module.exports = mongoose.model('Renter', schema);
