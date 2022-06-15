const storage = require('./../services/main')
const {sign} = require('jsonwebtoken')
const {hash, genSalt, compare} = require('bcrypt')
const {secret_jwt} = require('./../utils/keys')

const getAll = async (req, res, next) => {
  const users = await storage.user.find(req.query)

  res.status(200).json({success: true, data: users})
}

const getOne = async (req, res, next) => {
  const user = await storage.user.findOne({_id: req.params.id})

  if (!user) {
    return res.status(404).json({success: false, data: "user topilmadi"})
  }

  return res.status(200).json({success: true, data: user})
}

const getProfile = async (req, res, next) => {
  const {id, type} = req.user

  const user = await storage.user.findOne({_id: id})

  if (!user) {
    return res.status(404).json({success: false, data: "user topilmadi"})
  }

  return res.status(200).json({success: true, data: user})
}

const makeOne = async (req, res, next) => {
  const {password} = req.body

  if (password) {
    const salt = await genSalt()
    req.body.password = await hash(password, salt)
  }

  const user = await storage.user.create(req.body)

  if (!user) {
    return res.status(404).json({success: false})
  }

  return res.status(200).json({success: true, data: user})
}

const login = async (req, res, next) => {
  const {username, password} = req.body
  const user = await storage.user.findOne({username})
  if (user) {
    const password = await compare(password, user.password)
    if (password) {
      const token = sign(
        {id: user._id, type: user.type},
        secret_jwt, {expiresIn: 60 * 60}
      )
      res.status(200).send({success: true, data: token})
    } else {
      res.status(401).json({success: false})
    }
  } else {
    res.status(404).json({success: false})
  }
}

const updateOne = async (req, res, next) => {
  const {password} = req.body

  if (password) {
    const salt = await genSalt()
    req.body.password = await hash(password, salt)
  }

  const user = await storage.user.update({_id: req.params.id}, req.body)

  if (!user) {
    return res.status(404).json({success: false})
  }

  return res.status(200).json({success: true, data: user})
}

const updateUserProfile = async (req, res, next) => {
  const {id, type} = req.user

  const exist_user = await storage.user.findOne({_id: id})

  if (exist_user) {
    const user = await storage.user.update({_id: id}, req.body)

    if (!user) {
      return res.status(404).json({success: false})
    }

    return res.status(200).json({success: true, data: user})
  }

  return res.status(404).json({success: false})
}

const updateToAdmin = async (req, res, next) => {
  const {_id} = req.params, {id} = req.user, {status} = req.body

  let user = await storage.user.findOne({_id})

  if (user._id === id) {
    return res.status(404).json({success: false})
  }

  user = await storage.user.update({_id}, {status})

  return res.status(200).json({success: true, data: user})
}

const deleteOne = async (req, res, next) => {
  const user = await storage.user.findOne({_id: req.params.id})

  if (!user) {
    return res.status(404).json({success: false})
  }

  if (user) {
    await storage.user.delete({_id: user._id})
  }

  return res.status(200).json({success: true, data: user})
}

module.exports = {getAll, getOne, getProfile, makeOne, login, updateOne, updateUserProfile, updateToAdmin, deleteOne}
