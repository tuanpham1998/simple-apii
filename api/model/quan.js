const mongoose = require('mongoose');

const quan = mongoose.Schema({
    name: { type: String, require: true },
    type: { type: String, require: true },
    size: { type: String, require: true },
    img1: { type: String, require: true },
    img2: { type: String, require: true },
    price: { type: Number, require: true }
})

module.exports = mongoose.model('Quan', quan);