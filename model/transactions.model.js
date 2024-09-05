const mongoose = require('mongoose');
const { Schema } = mongoose;

const transactionsSchema = new Schema(
  {
    users: {
      type: Schema.Types.ObjectId,
      ref: 'UserProfile',
      required: [true, 'UserProfile Id is required'],
    },
    product: {
      type: Schema.Types.ObjectId,
      ref: 'Product',
    },
    date_time: {
      type: Date,
      default: Date.now(),
      required: [true, 'Transaction Date time is Required'],
    },
    type: {
      type: String,
      enum: {
        values: ['purchase', 'usage', ],
        message: `{VALUE} is not a valid type`,
      }
    },
    location: {
      type: Schema.Types.ObjectId,
      ref: 'Location',
      required: [true, 'Location Id is required'],
    }
  },
  {
    timestamps: {
      createdAt: 'created_at',
      updatedAt: 'updated_at',
    },
  },
);

transactionsSchema.pre(/^find/, function (next) {
  this.populate({
    path: 'user',
  });
  next();
});

transactionsSchema.pre(/^find/, function (next) {
  this.populate({
    path: 'product',
  });
  next();
});

transactionsSchema.pre(/^find/, function (next) {
  this.populate({
    path: 'location',
    select: 'name address',
  });
  next();
})

const Transaction = mongoose.model('Transaction', transactionsSchema);
module.exports = Transaction;
