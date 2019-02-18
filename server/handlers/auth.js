const jwt = require('jsonwebtoken');

const db = require('../models');

exports.register = async (req, res, next) => {
    try {
        console.log(req.body);
        const user = await db.User.create(req.body);
        console.log(user);
        const { id, username } = user;
        const token = jwt.sign({ id, username }, process.env.SECRET);
        res.status(201).json({ id, username, token });
    } catch (err) {
        if (err.code === 11000) {
            err.message = 'Sorry, that username is already taken';
        }
        next(err);
    }
};

exports.login = async (req, res, next) => {
    try {
        const user = await db.User.findOne({ username: req.body.username });
        if (user) {
            console.log(user);
            const { id, username } = user;
            const valid = user.comparePassword(req.body.password);
            if (valid) {
                const token = jwt.sign({ id, username }, process.env.SECRET);
                res.json({ id, username, token });
            } else {
                throw new Error('Invalid Username/Password');
            }
        } else {
            throw new Error('Invalid Username/Password');
        }
    } catch (err) {
        next(err);
    }
}; 