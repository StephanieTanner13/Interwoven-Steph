const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const varList = require('../utils/variables');

exports.login = (req, res, next) => {
    const email = req.body.email;
    const password = req.body.password;
    if (!email && !password) {
        const error = new Error('Can not have null values');
        error.statusCode = 401;
        throw error;
    }

    let foundUser;
    User.findOne({ email: email })
        .then((user) => {
            if (!user) {
                const error = new Error('Email/Password combo does not exist.');
                error.statusCode = 401;
                throw error;
            }
            foundUser = user;
            console.log('login happens')
            return bcrypt.compare(password, user.password);
        })
        .then((isEqual) => {
            if (!isEqual) {
                const error = new Error('Email/Password combo does not exist.');
                error.statusCode = 401;
                throw error;
            }

            const token = jwt.sign(
                {
                    email: foundUser.email,
                    userId: foundUser._id.toString(),
                    isMod: foundUser.isMod,
                },
                varList.jwtSec,
                { expiresIn: '1h' }
            );

            res.status(200).json({
                message: 'Logged in successfully.',
                userId: foundUser._id.toString(),
                isMod: foundUser.isMod,
                token: token,
            });
        })
        .catch((err) => {
            if (!err.statusCode) {
                err.statusCode = 500;
            } else {
                next(err);
            }
        });
};

exports.signUp = (req, res, next) => {
    const email = req.body.email;
    const fname = req.body.first_name;
    const lname = req.body.last_name;

    const password = req.body.password;
    bcrypt
        .hash(password, 12)
        .then((hash) => {
            console.log(hash);
            const user = new User({
                email: email,
                first_name: fname,
                last_name: lname,
                password: hash,
            });
            console.log('herer');
            return user.save();
        })
        .then((result) => {
            res.status(200).json({
                message: 'User Created!',
                userId: result._id,
            });
        })
        .catch((err) => catchError(err));
};

function catchError(err, next) {
    if (!err.statusCode) {
        err.statusCode = 500;
    } else {
        next(err);
    }
}

exports.changePassword = (req, res, next) => {
    const userId = req.userId;
    const oldPassword = req.body.oldPassword;
    const newPassword = req.body.newPassword;

    let foundUser;
    User.findById(userId)
        .then((user) => {
            if (!user) {
                const error = new Error('User does not exist.');
                error.statusCode = 401;
                throw error;
            }
            foundUser = user;
            return bcrypt.compare(oldPassword, user.password);
        })
        .then((isEqual) => {
            if (!isEqual) {
                const error = new Error('Passwords do not match.');
                error.statusCode = 400;
                throw error;
            }
            return bcrypt.hash(newPassword, 12);
        })
        .then((hash) => {
            foundUser.password = hash;
            return foundUser.save();
        })
        .then((result) => {
            res.status(200).json({ message: 'Password sucessfuly changed.' });
        })
        .catch((error) => {
            error.statusCode = 500;
            next(error);
        });
};
