const mongoose = require('mongoose');
const {Schema} = mongoose;

const customerVisitSchema = new Schema({
    customer_id: {
        type: Schema.Types.ObjectId,
        ref: 'Customer'
    },
    // subscription_plan_id: {
    //     type: Schema.Types.ObjectId,
    //     ref: 'SubscriptionPlan'
    // },
    order_id: {
        type: Schema.Types.ObjectId,
        ref: 'Order'
    },
    location_id: {
        type: Schema.Types.ObjectId,
        ref: 'Location',
        required: [true, "Location Id is required"]
    },
    start_time: {
        type: Date,
        default: Date.now(),
        required: [true, "Start Time is required"]
    },
    end_time: {
        type: Date,
    }
}, {
    timestamps: {
        createdAt: 'created_at',
        updatedAt: 'updated_at',
    }
});

const CustomerVisit = mongoose.model('CustomerVisit', customerVisitSchema);
module.exports = CustomerVisit;