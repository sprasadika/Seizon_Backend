const express = require('express');
const {addAvatar,
       getAllAvatars,
       getAvatar,
       updateAvatar,
       deleteAvatar
      } = require('../controllers/avatarController');

const router = express.Router();

router.post('/avatar', addAvatar);
router.get('/avatars', getAllAvatars);
router.get('/avatar/:id', getAvatar);
router.put('/avatar/:id', updateAvatar);
router.delete('/avatar/:id', deleteAvatar);


module.exports = {
    routes: router
}