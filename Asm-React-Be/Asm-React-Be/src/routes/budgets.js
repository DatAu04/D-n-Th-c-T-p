const app = require('express');
const BudgetController = require('../controllers/budget');
const { checkLogin } = require('../middlewares/auth');

const router = app.Router();

router.post('/', checkLogin, BudgetController.createBudget);
router.get('/', checkLogin, BudgetController.getAllBudget);
router.get('/:id', checkLogin, BudgetController.getBudget);
router.put('/:id', checkLogin, BudgetController.updateBudget);
router.delete('/:id', checkLogin, BudgetController.deleteBudget);

module.exports = router;
