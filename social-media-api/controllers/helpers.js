const { response } = require('express');
const { unknownError } = require('../helpers/unknownError');
const User = require('../models/User');
const Post = require('../models/Post');
const { default: mongoose } = require('mongoose');

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

        let posts = await Post.find({user: { username, image: user.image }});

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

        req.body.user = {
            username,
            image: user.image
        };
        delete req.body.username;

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

const likePostById = async(req, res = response) => {
    const { postId } = req.params;
    const { username } = req.body;

    try {
        const post = await Post.findById(postId);

        if (!post) return res.status(404).json({
            ok: false,
            msg: 'Publicación no encontrada.'
        });

        if (post.likes.some(user => user === username)) {
            post.likes.remove(username);
        } else {
            post.likes.push(username);
        }

        post.save();

        res.status(200).json({ ok: true });
    } catch(error) {
        unknownError(res, error);
    }
}

const commentPostById = async(req, res = response) => {
    const { postId } = req.params;
    const { comment, user } = req.body;

    try {
        const post = await Post.findById(postId);

        if (!post) return res.status(404).json({
            ok: false,
            msg: 'Publicación no encontrada.'
        });

        post.comments.push({ id: mongoose.Types.ObjectId(), comment, user });
        post.save();

        res.status(200).json({ ok: true, ...post.comments[post.comments.length - 1] });
    } catch(error) {
        unknownError(res, error);
    }
} 

const savePostById = async(req, res = response) => {
    const { postId } = req.params;
    const { username } = req.body;

    try {
        const post = await Post.findById(postId);

        if (!post) return res.status(404).json({
            ok: false,
            msg: 'Publicación no encontrada.'
        });

        const user = await User.findOne({ username });

        if (!user) return res.status(404).json({
            ok: false,
            msg: 'Usuario no encontrado.'
        });

        if (user.savedPosts.some(id => id === postId)) {
            user.savedPosts.remove(postId);
            post.usersThatSave.remove(username);
        } else {
            user.savedPosts.push(postId);
            post.usersThatSave.push(username);
        }

        user.save();
        post.save();

        res.status(200).json({ ok: true });
    } catch(error) {
        unknownError(res, error);
    }
}

module.exports = {
    getUserByUsername,
    getPostById,
    getAllPostsByUsername,
    createUserPost,
    likePostById,
    commentPostById,
    savePostById
}