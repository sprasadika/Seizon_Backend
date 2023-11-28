const express = require('express');
// const { authenticate } = require('../controllers/userController');
const {addUser,
        getAllUsers,
        getUser,
        updateUser,
        deleteUser,
        userRegister
      } = require('../controllers/userController');

const router = express.Router();

router.post('/user/register', userRegister);
router.get('/users', getAllUsers);
router.get('/user/:id', getUser);
router.put('/user/:id', updateUser);
router.delete('/user/:id', deleteUser);


module.exports = {
    routes: router
}