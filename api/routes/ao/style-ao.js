const express = require('express');
const cors = require('cors');
const router = express.Router();

const Ao = require('../../model/ao');

router.get('/aokhoac', async(req, res, next) => {
    const find = await Ao.find({ type: 'Ao Khoac' }, (err, data) => {
        res.status(200).json(data)
    })
    if (find.err) {
        res.status(500).json({
            message: err
        })
    }
})

router.get('/aosomi', async(req, res, next) => {
    const find = await Ao.find({ type: 'So mi' }, (err, data) => {
        res.status(200).json(data)
    })
    if (find.err) {
        res.status(500).json({
            message: err
        })
    }
})

router.get('/aothun', async(req, res, next) => {
    const find = await Ao.find({ type: 'Ao thun' }, (err, data) => {
        res.status(200).json(data)
    })
    if (find.err) {
        res.status(500).json({
            message: err
        })
    }
})

module.exports = router;