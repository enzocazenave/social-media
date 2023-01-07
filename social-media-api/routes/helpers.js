const { Router } = require('express');
const { check } = require('express-validator');
const { getUserByUsername, createUserPost, getPostById, getAllPostsByUsername } = require('../controllers/helpers');

const router = Router();

router.get('/user/:username', [], getUserByUsername);

router.get('/post/:postId', [], getPostById);

router.get('/posts/:username', [], getAllPostsByUsername);

router.post('/post', [
    check('username', 'Es obligatorio estar en una sesión').not().isEmpty(),
    check('image', 'La imagen es obligatoria').not().isEmpty().isURL()
], createUserPost);

module.exports = router;