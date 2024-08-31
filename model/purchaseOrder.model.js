const mongoose = require('mongoose');
const {Schema} = mongoose;

const purchaseOrderSchema = new Schema({
    customer_id: {
        type: Schema.Types.ObjectId,
        ref: 'Customer',
        required: [true, 'Customer Id is required']
    },
    subscription_plan_id: {
        type: Schema.Types.ObjectId,
        ref: 'SubscriptionPlan'
    },
    product_id: {
        type: Schema.Types.ObjectId,
        ref: 'Product'
    },
    payment_mode : {
        type: String,
        enum: ['online', 'offline'],
        required: [true, 'Payment Mode is Required']
    },
    transaction_details: {
        type : String,
        required: [true, 'Transaction Details is Required']
    },
    amount_received: {
        type: Number,
        required: [true, 'Amount received is Required']
    },
    start_time: {
        type: Date,
        default: Date.now(),
        required: [true, 'Purchase Order Start time is Required']
    }
}, {
    timestamps: {
        createdAt: 'created_at',
        updatedAt: 'updated_at',
    }
});



const PurchaseOrder = mongoose.model('PurchaseOrder', purchaseOrderSchema);
module.exports = PurchaseOrder;