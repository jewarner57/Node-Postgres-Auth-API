const jwt = require('jsonwebtoken');
require('dotenv').config();

function jwtGenerator(userId) {
  return jwt.sign(
    { _id: userId },
    process.env.SECRET_KEY,
    { expiresIn: '10 days' },
  )
}

module.exports = jwtGenerator
