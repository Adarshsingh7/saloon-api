const mongoose = require('mongoose');
const { Schema } = mongoose;

const serviceUsageSchema = new Schema(
  {
    users: {
      type: Schema.Types.ObjectId,
      ref: 'UserProfile',
      required: [true, 'User Id is required'],
    },
    available_balance: {
      type: Number,
      required: [true, 'Total Spend is required'],
    },
    total_balance: {
      type: Number,
      required: [true, 'Balance is required'],
    },
  },
  {
    timestamps: {
      createdAt: 'created_at',
      updatedAt: 'updated_at',
    },
  },
);

const ServiceUsage = mongoose.model('ServiceUsage', serviceUsageSchema);
module.exports = ServiceUsage;
