const mongoose = require('mongoose');
const {Schema} = mongoose;

const orderSchema = new Schema({
customer_id: {
    type: Schema.Types.ObjectId,
    ref: 'Customer',
    required: true,
},
order_type: {
    type: String,
    enum: ['subscription', 'product'],
    required: true
},
subscription_plan_id: {
    type: Schema.Types.ObjectId,
    ref: 'SubscriptionPlan',
},
product_id: {
    type: Schema.Types.ObjectId,
    ref: 'Product',
},
total_minutes: {
    type: Number,
    required: true
},
status: {
    type: String,
    enum: ['active', 'expired', 'cancelled'],
},
order_date: {
    type: Date,
    default: Date.now(),
    required: true
},
location_id: {
    type: Schema.Types.ObjectId,
    ref: 'Location',
    required: true
},
}, {
    timestamps: {
        createdAt: 'created_at',
        updatedAt: 'updated_at'
    }
});

const Order = mongoose.model('Order', orderSchema);

module.exports = Order;