const { response } = require('express');
const { unknownError } = require('../helpers/unknownError');
const User = require('../models/User');
const { genSaltSync, hashSync, compareSync } = require('bcryptjs');

const registerUser = async(req, res = response) => {
    const { username, email, password } = req.body;

    try {
        let user = await User.findOne({ username });

        if (user) return res.status(400).json({
            ok: false,
            msg: `El nombre de usuario '${ username }' está en uso.`
        });

        user = await User.findOne({ email });

        if (user) return res.status(400).json({
            ok: false,
            msg: `El correo electrónico '${ email }' está en uso.`
        });

        req.body.bio = '';
        req.body.image = '';

        user = new User(req.body);
        
        const salt = genSaltSync();
        user.password = hashSync(password, salt);

        await user.save();

        delete user._doc.__v;
        delete user._doc._id;
        delete user._doc.password;

        res.status(201).json({
            ok: true,
            ...user._doc
        });
    } catch(error) {
        unknownError(res, error);
    }
    
}

const loginUser = async(req, res = response) => {
    const { user: username_email, password } = req.body;

    try {
        const user = username_email.includes('@') 
                        ? await User.findOne({ email: username_email })
                        : await User.findOne({ username: username_email });
        
        if (!user) return res.status(400).json({
            ok: false,
            msg: 'Sus credenciales son incorrectas.'
        });

        const isPasswordValid = compareSync(password, user.password);

        if (!isPasswordValid) return res.status(400).json({
            ok: false,
            msg: 'Sus credenciales son incorrectas.'
        });

        delete user._doc.__v;
        delete user._doc._id;
        delete user._doc.password;

        res.status(201).json({
            ok: true,
            ...user._doc
        });
    } catch(error) {
        unknownError(res, error);
    }
}

module.exports = {
    registerUser, 
    loginUser
}