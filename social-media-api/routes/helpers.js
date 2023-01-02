const { Router } = require('express');
const { getUserByUsername, createUserPost } = require('../controllers/helpers');

const router = Router();

router.get('/user/:username', [], getUserByUsername);

router.post('/post', [], createUserPost);

module.exports = router;