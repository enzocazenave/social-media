const { Router } = require('express');
const { check } = require('express-validator');
const { getUserByUsername, createUserPost } = require('../controllers/helpers');

const router = Router();

router.get('/user/:username', [], getUserByUsername);

router.post('/post', [
    check('username', 'Es obligatorio estar en una sesión').not().isEmpty(),
    check('title', 'El pie de foto es obligatorio').not().isEmpty(),
    check('image', 'La imagen es obligatoria').not().isEmpty().isURL()
], createUserPost);

module.exports = router;