const { response } = require('express');
const { unknownError } = require('../helpers/unknownError');
const User = require('../models/User');
const Post = require('../models/Post');

const getUserByUsername = async(req, res = response) => {
    const { username } = req.params;

    try {
        const user = await User.findOne({ username });
        
        if (!user) return res.status(404).json({
            ok: false,
            msg: 'Usuario no encontrado.'
        });

        delete user._doc.password;
        delete user._doc.__v;
        delete user._doc._id;

        res.status(200).json({
            ok: true,
            ...user._doc
        });
    } catch(error) {
        unknownError(res, error);
    }
}

const getPostById = async(req, res = response) => {
    const { postId } = req.params;

    try {
        const post = await Post.findById(postId);

        if (!post) return res.status(404).json({
            ok: false,
            msg: 'Publicación no encontrada.'
        });

        delete post._doc.__v;

        res.status(200).json({
            ok: true,
            ...post._doc
        });
    } catch(error) {
        unknownError(res, error);
    }
}

const getAllPostsByUsername = async(req, res = response) => {
    const { username } = req.params;

    try {
        const user = await User.findOne({ username });

        if (!user) return res.status(404).json({
            ok: false,
            msg: 'Usuario no encontrado.'
        });

        let posts = await Post.find({ username });

        posts = posts.map(post => {
            delete post._doc.__v;
            return post;
        });

        res.status(200).json({
            ok: true,
            posts
        });
    } catch(error) {
        unknownError(res, error);
    }
}

const createUserPost = async(req, res = response) => {
    const { username } = req.body;

    try {
        const user = await User.findOne({ username });

        if (!user) return res.status(404).json({
            ok: false,
            msg: 'Usuario no encontrado o sesión no válida.'
        });

        const post = new Post(req.body);
        await post.save();

        res.status(200).json({
            ok: true,
            postId: post.uid
        });
    } catch(error) {
        unknownError(res, error);
    }
}

module.exports = {
    getUserByUsername,
    getPostById,
    getAllPostsByUsername,
    createUserPost
}