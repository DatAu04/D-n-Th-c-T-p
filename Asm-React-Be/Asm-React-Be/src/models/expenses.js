const { Schema, model } = require('mongoose');

const expensesSchema = new Schema(
    {
        description: {
            type: String,
            required: true,
        },
        price: {
            type: Number,
            required: true,
        },
        budget: {
            type: Schema.Types.ObjectId,
            required: true,
            ref: 'budget',
        },
        user: {
            type: Schema.Types.ObjectId,
            required: true,
            ref: 'users',
        },
        date: {
            type: Date,
            required: true,
        },
    },
    { timestamps: true },
);

module.exports = model('expenses', expensesSchema);
