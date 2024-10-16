const { Schema, model } = require('mongoose');

const budgetSchema = new Schema(
    {
        budget: {
            type: Number,
            required: true,
        },
        name: {
            type: String,
            required: true,
        },
        user: {
            type: Schema.Types.ObjectId,
            ref: 'user',
            required: true,
        },
    },
    { timestamps: true },
);

module.exports = model('budget', budgetSchema);
