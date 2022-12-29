const { Router } = require('express');
const { getUserByUsername } = require('../controllers/helpers');

const router = Router();

router.get('/user/:username', [], getUserByUsername);

module.exports = router;