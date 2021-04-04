const jwt = require('jsonwebtoken')
const dotenv = require('dotenv');

dotenv.config();

module.exports = {
    checker: function(req, res, next) {
        var token = req.headers['x-access-token'];
        if (!token) return res.status(401).send({ auth: false, message: 'Missing token!' });
        
        jwt.verify(token, process.env.TOKEN_SECRET, function(err, decoded) {
            if (err) return res.status(500).send({ auth: false, message: 'Authentication failed!' });
        
            req.userId = decoded.id;
            next();
        });
    }
}