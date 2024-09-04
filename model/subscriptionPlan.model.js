// const mongoose = require('mongoose');
// const {Schema} = mongoose;

// const subscriptionPlanSchema = new Schema({
//     plan_name: {
//         type: String,
//         required: [true, 'Subscription Plan Name is Required'],
//         trim: true,
//     },
//     plan_description: {
//         type: String,
//         required: [true, 'Subscription Plan Description is Required'],
//         trim: true,
//     },
//     price: {
//        type: Number,
//        required: [true, 'Subscription Price is Required'],
//     },
//     minutes_available: {
//         type: Number,
//         required: [true, 'Subscription Minutes Available is Required'],
//     }
// }, {
//     timestamps: {
//         createdAt: 'created_at',
//         updatedAt: 'updated_at',
//     }
// });

// const SubscriptionPlan = mongoose.model('SubscriptionPlan', subscriptionPlanSchema);

// module.exports = SubscriptionPlan;