const mongoose = require('mongoose');
const { Schema } = mongoose;

const serviceSchema = new Schema(
  {
    serviceName: {
      type: String,
      required: [true, 'Service Name is required'],
    },
    minutesAvailable: {
      type: Number,
      required: [true, 'Minutes is required'],
    },
    price: {
      type: Number,
      required: [true, 'Price is required'],
    },
  },
  { timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } },
);

serviceSchema.pre('updateOne', function (next) {
  this.set({ updatedAt: Date.now() });
  next();
});

const Service = mongoose.model('Service', serviceSchema);

module.exports = Service;
