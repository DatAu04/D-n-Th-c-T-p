const ExpensesModel = require('../models/expenses');

const ExpensesController = {
    createExpenses: async (req, res) => {
        try {
            const userId = req.user.id;
            const { price, description, budget, date } = req.body;

            const expenses = await new ExpensesModel({
                user: userId,
                price,
                description,
                budget,
                date,
            }).save();

            res.json(expenses);
        } catch (error) {
            res.status(500).json({
                message: 'Internal server error',
                error: error.message,
            });
        }
    },

    getAllExpenses: async (req, res) => {
        try {
            const user = req.user.id;

            const budgets = await ExpensesModel.find({ user })
                .populate(['user', 'budget'])
                .exec();

            res.json(budgets);
        } catch (error) {
            res.status(500).json({
                message: 'Internal server error',
                error: error.message,
            });
        }
    },

    getExpenses: async (req, res) => {
        try {
            const { id } = req.params;
            const expenses = await ExpensesModel.findById(id)
                .populate(['user', 'budget'])
                .exec();

            if (!expenses) {
                return res.status(404).json({ message: 'Expenses not found!' });
            }

            res.json(expenses);
        } catch (error) {
            res.status(500).json({
                message: 'Internal server error',
                error: error.message,
            });
        }
    },

    updateBudget: async (req, res) => {
        try {
            const { price, description, budget, date } = req.body;
            const { id } = req.params;

            const expenses = await ExpensesModel.findByIdAndUpdate(
                id,
                { price, description, budget, date },
                { new: true },
            ).exec();

            res.json(expenses);
        } catch (error) {
            res.status(500).json({
                message: 'Internal server error',
                error: error.message,
            });
        }
    },

    deleteExpenses: async (req, res) => {
        try {
            const { id } = req.params;

            const expenses = await ExpensesModel.findByIdAndDelete(id).exec();

            res.json(expenses);
        } catch (error) {
            res.status(500).json({
                message: 'Internal server error',
                error: error.message,
            });
        }
    },
};

module.exports = ExpensesController;
