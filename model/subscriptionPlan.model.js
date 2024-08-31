const mongoose = require('mongoose');
const {Schema} = mongoose;

const subscriptionPlanSchema = new Schema({
    customer_id: {
        type: Schema.Types.ObjectId,
        ref: 'Customer',
        required: true
    },
    plane_name: {
        type: String,
        required: true,
        trim: true,
    },
    plan_description: {
        type: String,
        required: true,
        trim: true,
    },
    minutes_available: {
        type: Number,
        required: true,
    }
}, {
    timestamps: {
        createdAt: 'created_at',
        updatedAt: 'updated_at',
    }
});

const SubscriptionPlan = mongoose.model('SubscriptionPlan', subscriptionPlanSchema);

module.exports = SubscriptionPlan;