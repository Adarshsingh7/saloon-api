const mongoose = require('mongoose');
const {Schema} = mongoose;

const orderSchema = new Schema({
customer_id: {
    type: Schema.Types.ObjectId,
    ref: 'Customer',
    required: [true, 'Customer Id is required'],
},
order_type: {
    type: String,
    enum: ['subscription', 'product'],
    required: [true, 'Order Type is required']
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
    required: [true, 'Total minutes is required']
},
status: {
    type: String,
    enum: ['active', 'expired', 'cancelled'],
},
order_date: {
    type: Date,
    default: Date.now(),
    required: [true, 'Order Date is required']
},
location_id: {
    type: Schema.Types.ObjectId,
    ref: 'Location',
    required: [true, 'Location ID is required']
},
}, {
    timestamps: {
        createdAt: 'created_at',
        updatedAt: 'updated_at'
    }
});

const Order = mongoose.model('Order', orderSchema);

module.exports = Order;