const jwt = require('jsonwebtoken')
require('dotenv').config();

const verifyJwt = (req, res, next) => {
    const authHeader = req.headers['authorization']
    const token = authHeader.split(' ')[1]

    jwt.verify(
        token,
        process.env.ACCESS_TOKEN_SECRET,
        (err, decoded) => {
            if(err) res.status(400)
            req.user = decoded.username
            next()
        }
    )
}

module.exports = {
    verifyJwt
}