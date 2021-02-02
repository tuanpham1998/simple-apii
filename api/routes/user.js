const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const User = require('../model/user');

router.get('/user', async (req, res, next) => {
    try {
        const getUser = await User.find({});
        if (!getUser) return res.status(500).json({ message: getUser.error });
        return res.status(200).json(getUser.data);
    } catch (err) {
        return res.status(500).json({ message: err });
    }
})

router.post('/singup', async (req, res, next) => {
    const check_exsit = await User.find({ email: req.body.email });
    if (check_exsit.err) return res.status(409).json({ error: err })
    if (check_exsit.length >= 1) return res.status(409).json({ message: 'mail exists' })
    const result_hash = await bcrypt.hash(req.body.password, 10);
    if (!result_hash) return res.status(500).json({ error: "Error System" });
    const user = new User({
        email: req.body.email,
        password: result_hash
    })
    const save = user.save();
    if (save.err) return res.status(409).json({ error: "Error System" });
    res.status(201).json({
        message: 'user created',
        data: user
    });
})

router.post('/login', async (req, res, next) => {
    try {
        const user = await User.find({ email: req.body.email });
        if (user.length < 1) return res.status(401).json({ message: "Auth failed" });
        const hash_result = await bcrypt.compare(req.body.password, user[0].password);
        if (!hash_result) return res.status(401).status.json({ message: "Error System" });
        const user_data = {
            email: user[0].email,
            userId: user[0]._id
        }
        const token = jwt.sign(user_data, process.env.Secret, { expiresIn: "1h" });
        if (token) {
            return res.status(200).json({
                message: "Auth successful",
                token: token
            });
        }
        return res.status(401).json({
            message: "Auth failed"
        });
    } catch (err) {
        return res.status(401).json({
            message: err
        });
    }
})

router.delete('/:userId', (req, res, next) => {
    const rs = await User.remove({ _id: req.params.userId });
    if (rs) return res.status(200).json({ message: "Delete Success" });
})

module.exports = router;