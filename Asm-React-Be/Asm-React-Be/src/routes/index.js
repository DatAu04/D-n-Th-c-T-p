const express = require('express');

const authRouter = require('./auth');
const expensesRouter = require('./expenses');
const budgetRouter = require('./budgets');

const router = express.Router();
router.use('/auth', authRouter);
router.use('/expenses', expensesRouter);
router.use('/budgets', budgetRouter);

module.exports = router;
