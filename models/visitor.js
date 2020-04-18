const mongoose = require('mongoose')

const visitorSchema = new mongoose.Schema({
    ip: {
        type: String,
    },
    browser: {
        type: String,
        default: 'none'
    }
})


module.exports = mongoose.model('Visitor', visitorSchema)