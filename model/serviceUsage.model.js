const mongoose = require('mongoose');
const { Schema } = mongoose;

const serviceUsageSchema = new Schema(
  {
    user_id: {
      type: Schema.Types.ObjectId,
      ref: 'UserProfile',
      required: [true, 'User Id is required'],
    },
    total_spend: {
      type: Number,
      required: [true, 'Total Spend is required'],
    },
    balance: {
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