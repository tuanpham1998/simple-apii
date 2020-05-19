const express = require('express');
const cors = require('cors');
const router = express.Router();

const Quan = require('../../model/quan');

router.get('/quanjean', async(req, res, next) => {
    const find = await Quan.find({ type: 'Quan jean' }, (err, data) => {
        res.status(200).json(data)
    })
    if (find.err) {
        res.status(500).json({
            message: err
        })
    }
})

router.get('/quanshort', async(req, res, next) => {
    const find = await Quan.find({ type: 'Quan short' }, (err, data) => {
        res.status(200).json(data)
    })
    if (find.err) {
        res.status(500).json({
            message: err
        })
    }
})

module.exports = router;