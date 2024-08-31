const mongoose = require('mongoose');
const {Schema} = mongoose;

const customerVisitSchema = new Schema({
    customer_id: {
        type: Schema.Types.ObjectId,
        ref: 'Customer'
    },
    subscription_plan_id: {
        type: Schema.Types.ObjectId,
        ref: 'SubscriptionPlan'
    },
    order_id: {
        type: Schema.Types.ObjectId,
        ref: 'Order'
    },
    location_id: {
        type: Schema.Types.ObjectId,
        ref: 'Location'
    },
    start_time: {
        type: Date,
        required: true
    },
    end_time: {
        type: Date,
        required: true
    }
}, {
    timestamps: {
        createdAt: 'created_at',
        updatedAt: 'updated_at',
    }
});

const CustomerVisit = mongoose.model('CustomerVisit', customerVisitSchema);
module.exports = CustomerVisit;