const {verify} = require('jsonwebtoken')
const upload = require('./upload')
const {secret_jwt} = require('./../utils/keys')

const auth = (req, res, next) => {
  const token = req.header.authorization
  if (!token) return res.status(401).send({success: false})
  try {
    const decoded = verify(token, secret_jwt);
    req.user = decoded;
    next()
  } catch (e) {
    return res.status(404).send(e)
  }
}

const isAdmin = (req, res, next) => {
  return req.user.type !== "admin" ? res.status(403).send({success: false}) : next()
  // if (req.user.type !== "admin") return res.status(403).send({success: false});
  // next()
}

const isSuperAdmin = (req, res, next) => {
  return req.user.type !== "super_admin" ? res.status(403).send({success: false}) : next()
  // if (req.user.type !== "super_admin") return res.status(403).send({success: false});
  // next();
}

const transfer = upload.single('image')

module.exports = {auth, isAdmin, isSuperAdmin, transfer}
