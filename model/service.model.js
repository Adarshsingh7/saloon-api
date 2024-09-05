const mongoose = require('mongoose');
const { Schema } = mongoose;

const serviceSchema = new Schema({
  name: {
    type: String,
    required: [true, 'Service Name is required'],
  },
  minutes: {
    type: Number,
    required: [true, 'Minutes is required'],
  },
  price: {
    type: Number,
    required: [true, 'Price is required'],
  },
});

const Service = mongoose.model('Service', serviceSchema);

module.exports = Service;
