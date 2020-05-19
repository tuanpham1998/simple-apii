const express = require('express');
const router = express.Router();
const Ao = require('../../model/ao');
const cors = require('cors');
const verify = require('../../Cotroller/authCotroller');

router.get('/', async(req, res, next) => {
    const find = await Ao.find({}, (err, data) => {
        res.status(200).json(data)
    })
    if (find.err) {
        res.status(500).json({
            message: err
        })
    }
})

router.post('/', verify, cors(), async(req, res, next) => {
    const ao = new Ao({
        name: req.body.name,
        type: req.body.type,
        size: req.body.size,
        img1: req.body.img1,
        img2: req.body.img2,
        price: req.body.price
    })
    const save = await ao.save();

    if (save.err) {
        return res.status(500).json({
            message: err
        })
    }

    res.status(201).json({
        message: "POST success",
        data: ao
    })
})

router.delete('/:id', verify, async(req, res, next) => {
    const del = await Ao.remove({ _id: req.params.id });
    if (del.err) {
        return res.status(500).json({
            message: err
        })
    }

    res.status(200).json({
        message: "Delete success",
    })
})

router.get('/:id', async(req, res, next) => {
    findOne = await Ao.find({ _id: req.params.id }, (err, data) => {
        res.status(200).json(data);
    })
    if (findOne.err) {
        res.status(500).json({
            message: err
        })
    }
})

module.exports = router;
