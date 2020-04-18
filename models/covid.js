const mongoose = require('mongoose')

const covidSchema = new mongoose.Schema({
    country: {
        type: String,
        required: true,
        default: 'all_countries'
    },
    apiResponseBody: {
        type: Object,
        required: true
    },
    apiResponseDate: {
        type: Date,
        required: true,
        default: Date.now
    },
    visitor: {
        type: Object,
        default: ['no data']
    }
})


module.exports = mongoose.model('Covid', covidSchema)