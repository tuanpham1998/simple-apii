const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const cors = require('cors');

const User = require('../model/user');

router.get('/user', async(req, res, next) => {
    const getUser = await User.find({}, function(err, data) {
        res.status(200).json(data);
    });
    if (getUser.err) {
        return res.status(500).json({
            error: err
        })
    }
    console.log('da');
})

router.post('/singup', async(req, res, next) => {
    const a = await User.find({ email: req.body.email });
    if (a.err) {
        return res.status(409).json({
            error: err
        })
    }
    if (a.length >= 1) {
        return res.status(409).json({
            message: 'mail exists'
        })
    }
    bcrypt.hash(req.body.password, 10, (err, hash) => {
        if (err) {
            return res.status(500).json({
                error: err
            });
        }
        const user = new User({
            email: req.body.email,
            password: hash
        })
        const save = user.save();
        if (save.err) {
            return res.status(409).json({
                error: err
            })
        }
        res.status(201).json({
            message: 'user created',
            data: user
        });
    })
})

router.post('/login', (req, res, next) => {
    User.find({ email: req.body.email })
        .exec()
        .then(user => {
            if (user.length < 1) {
                return res.status(401).json({
                    message: "Auth failed"
                });
            }
            bcrypt.compare(req.body.password, user[0].password, (err, result) => {
                if (err) {
                    return res.status(401).status.json({
                        message: "Auth failed"
                    });
                }
                if (result) {
                    const token = jwt.sign({
                            email: user[0].email,
                            userId: user[0]._id
                        },
                        process.env.Secret, {
                            expiresIn: "1h"
                        });
                    return res.status(200).json({
                        message: "Auth successful",
                        token: token
                    });
                }

                res.status(401).json({
                    message: "Auth failed"
                });
            })
        })
        .catch()
})

router.delete('/:userId', (req, res, next) => {
    User.remove({ _id: req.params.userId })
        .exec()
        .then(result => {
            res.status(200).json({
                message: 'user deleted'
            })
        })
        .catch(err => {
            res.status(500).json({
                error: err
            })
        })
})

module.exports = router;