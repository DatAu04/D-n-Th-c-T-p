const BudgetModel = require('../models/budgets');

const BudgetController = {
    createBudget: async (req, res) => {
        try {
            const user = req.user.id;
            const { budget, name } = req.body;

            const budgetCreated = await new BudgetModel({
                budget,
                name,
                user,
            }).save();

            res.json(budgetCreated);
        } catch (error) {
            res.status(500).json({
                message: 'Internal server error',
                error: error.message,
            });
        }
    },

    getAllBudget: async (req, res) => {
        try {
            const budgets = await BudgetModel.find({
                user: req.user.id,
            }).exec();

            res.json(budgets);
        } catch (error) {
            res.status(500).json({
                message: 'Internal server error',
                error: error.message,
            });
        }
    },

    getBudget: async (req, res) => {
        try {
            const { id } = req.params;
            const budget = await BudgetModel.findById(id).exec();

            if (!budget) {
                return res.status(404).json({ message: 'Budget not found!' });
            }

            res.json(budget);
        } catch (error) {
            res.status(500).json({
                message: 'Internal server error',
                error: error.message,
            });
        }
    },

    updateBudget: async (req, res) => {
        try {
            const { budget, name } = req.body;
            const { id } = req.params;

            const budgetUpdated = await BudgetModel.findByIdAndUpdate(
                id,
                { budget, name },
                { new: true },
            ).exec();

            res.json(budgetUpdated);
        } catch (error) {
            res.status(500).json({
                message: 'Internal server error',
                error: error.message,
            });
        }
    },

    deleteBudget: async (req, res) => {
        try {
            const { id } = req.params;

            const budget = await BudgetModel.findByIdAndDelete(id).exec();

            res.json(budget);
        } catch (error) {
            res.status(500).json({
                message: 'Internal server error',
                error: error.message,
            });
        }
    },
};

module.exports = BudgetController;
