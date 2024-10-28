const jwt = require('jsonwebtoken');
const { promisify } = require('util');

const decryptedToken = (authHeader) => {
    const token = authHeader.split(" ")[1];
    return promisify(jwt.verify)(token, process.env.HASH_BCRYPT);
};

module.exports = {
    decryptedToken
}