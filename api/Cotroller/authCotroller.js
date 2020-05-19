const jwt = require('jsonwebtoken');

module.exports = function isAuth(req, res, next) {
    const token = req.body.token;
    if (!token) return res.status(401).json({
        message: 'Access denied'
    })

    try {
        const verified = jwt.verify(token, process.env.Secret);
        req.user = verified;
        next();
    } catch {
        res.status(400).json({
            message: 'Invalid Token'
        })
    }
}