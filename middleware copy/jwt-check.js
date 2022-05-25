const jwt = require('jsonwebtoken');
const varList = require('../utils/variables');
module.exports = (req, res, next) => {
    const authorization = req.get('Authorization');
    if (!authorization) {
        const error = new Error('Not Authorized6');
        error.statusCode = 401;
        throw error;
    }
    const token = req.get('Authorization').split(' ')[1];
    let decodedToken;
    try {
        decodedToken = jwt.verify(token, varList.jwtSec);
    } catch (err) {
        err.statusCode = 500;
        throw err;
    }
    if (!decodedToken) {
        const error = new Error('Not Authorized19');
        error.statusCode = 401;
        throw error;
    }
    req.userId = decodedToken.userId;
    req.isMod = decodedToken.isMod;
    next();
};
