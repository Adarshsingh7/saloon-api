const mongoose = require('mongoose');
const {Schema} = mongoose;

const purchaseOrderSchema = new Schema({
    customer_id: {
        type: Schema.Types.ObjectId,
        ref: 'Customer'
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
        required: true
    },
    transaction_details: {
        type : String,
        required: true
    },
    amount_received: {
        type: Number,
        required: true
    },
    start_time: {
        type: Date,
        required: true
    }
}, {
    timestamps: {
        createdAt: 'created_at',
        updatedAt: 'updated_at',
    }
});

const PurchaseOrder = mongoose.model('PurchaseOrder', purchaseOrderSchema);
module.exports = PurchaseOrder;