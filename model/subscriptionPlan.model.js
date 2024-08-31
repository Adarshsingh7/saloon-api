const mongoose = require('mongoose');
const {Schema} = mongoose;

const subscriptionPlanSchema = new Schema({
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
    price: {
       type: Number,
       required: true,
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