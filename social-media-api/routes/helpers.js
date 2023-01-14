const { Router } = require('express');
const { check } = require('express-validator');
const { getUserByUsername, createUserPost, getPostById, getAllPostsByUsername, likePostById, commentPostById } = require('../controllers/helpers');

const router = Router();

router.get('/user/:username', [], getUserByUsername);

router.get('/post/:postId', [], getPostById);

router.get('/posts/:username', [], getAllPostsByUsername);

router.post('/post', [
    check('username', 'Es obligatorio estar en una sesión').not().isEmpty(),
    check('image', 'La imagen es obligatoria').not().isEmpty().isURL()
], createUserPost);

router.post('/post/:postId/like', [
    check('username', 'Es obligatorio estar en una sesión').not().isEmpty()
], likePostById);

router.post('/post/:postId/comment', [
    check('comment', 'El comentario es obligatorio').not().isEmpty(),
    check('user', 'Es obligatorio estar en una sesión').isObject(),
], commentPostById);

module.exports = router;