const Visitor = require('../models/visitor')

function visitor(req, res, next) {
    const visitor = new Visitor({
        ip: req.connection.remoteAddress || req.socket.remoteAddress,
        browser: req.headers['user-agent'],
    })
    
    visitor.save()
    next()
}


module.exports = visitor