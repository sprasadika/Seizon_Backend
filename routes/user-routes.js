const express = require('express');
const {addAvatar, 
       getAllAvatars,
       getAvatar,
       updateAvatar,
       deleteAvatar
      } = require('../controllers/avatarController');

const router = express.Router();

router.post('/user', addAvatar);
router.get('/users', getAllAvatars);
router.get('/user/:id', getAvatar);
router.put('/user/:id', updateAvatar);
router.delete('/user/:id', deleteAvatar);


module.exports = {
    routes: router
}