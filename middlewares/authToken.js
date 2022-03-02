const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config();

function authenticateToken(req, res, next) {
  const authHeader = req.headers['authorization']
  const token = authHeader && authHeader.split(' ')[1]

  if (token == null) return res.sendStatus(401)

  jwt.verify(token, process.env.TOKEN_SECRET , (err, user) => {
    console.log(err)

    if (err) return res.sendStatus(403)

    req.user = user

    next()
  })
}

function generateAccessToken(email) {
  return jwt.sign({email:email}, process.env.TOKEN_SECRET, {
    expiresIn: '1d',
  });
}

const token = {
  authenticateToken,
  generateAccessToken
};
module.exports = token;