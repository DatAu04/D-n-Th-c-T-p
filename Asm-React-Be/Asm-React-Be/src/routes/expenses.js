const app = require('express');
const ExpensesController = require('../controllers/expenses');
const { checkLogin } = require('../middlewares/auth');

const router = app.Router();

router.post('/', checkLogin, ExpensesController.createExpenses);
router.get('/', checkLogin, ExpensesController.getAllExpenses);
router.get('/:id', checkLogin, ExpensesController.getExpenses);
router.put('/:id', checkLogin, ExpensesController.updateBudget);
router.delete('/:id', checkLogin, ExpensesController.deleteExpenses);

module.exports = router;
