const express = require('express');
const {addGoal, 
       getAllGoals, 
       getAllGoalsByUser,
       getGoalbyUser,
       updateGoal,
       deleteGoal
      } = require('../controllers/goalController');

const router = express.Router();

router.post('/goal', addGoal);
router.get('/goals', getAllGoals);
router.get('/goals-by-user/:id', getAllGoalsByUser);
router.get('/goal-by-user/:id/:g_id', getGoalbyUser);
router.put('/goal/:id', updateGoal);
router.delete('/goal/:id', deleteGoal);


module.exports = {
    routes: router
}