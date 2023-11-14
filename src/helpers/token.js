const jwt = require('jsonwebtoken');

class Token {
    static generateToken = (data, secret, expiresIn) => {
        return jwt.sign(data, secret, { expiresIn });
    };

    static verifyToken = (token, secret) => {
        return jwt.verify(token, secret);
    }
    // const authorized = jwt.verify(token, process.env.TOKEN_SECRET);
}

module.exports = Token;