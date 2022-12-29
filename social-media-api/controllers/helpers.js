const { response } = require('express');
const { unknownError } = require('../helpers/unknownError');
const User = require('../models/User');

const getUserByUsername = async(req, res = response) => {
    const { username } = req.params;

    try {
        const user = await User.findOne({ username });
        
        if (!user) return res.status(401).json({
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

module.exports = {
    getUserByUsername
}