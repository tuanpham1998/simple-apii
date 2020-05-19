const mongoose = require('mongoose');

const user = mongoose.Schema({
    email: {
        type: String,
        require: true,
        unique: true,
        match: /^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/
    },
    password: { type: String, require: true },
    date: { type: Date, default: Date.now }
})

module.exports = mongoose.model('User', user);