/** @format */

const mongoose = require('mongoose');
const { Schema } = mongoose;

const customerSchema = new Schema(
	{
        user_id: {
            type: Schema.Types.ObjectId,
            ref: 'User',
            required: true,

        },
		name: {
			type: String,
			required: true,
			trim: true,
		},
        email: {
            type: String,
            required: true,
            unique: true,
            trim: true,
        },
		address: {
			type: String,
			required: true,
			trim: true,
		},
        phone_number: {
            type: String,
            required: true,
            unique: true,
            trim: true,
        },
		gender: {
			type: String,
			enum: ['Male', 'Female', 'Other'],
			required: true,
		},
        gdpr_sms_active: {
         type: Boolean,
         default: false,
        },
        gdpr_email_active: {
            type: Boolean,
            default: false,
        },
		preferred_location_id: {
			type: Schema.Types.ObjectId,
			ref: 'Location',
			required: true,
		},
		// subscription_plan_id: {
		// 	type:[ Schema.Types.ObjectId],
		// 	ref: 'SubscriptionPlan',
		// 	required: true,
		// },
	},
	{
		timestamps: {
			createdAt: 'created_at',
			updatedAt: 'updated_at',
		},
	}
);

const Customer = mongoose.model('Customer', customerSchema);
module.exports = Customer;
