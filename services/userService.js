const User = require('./../models/userModel')

class UserService {
  async find(query) {
    try {
      return await User.find(query)
    } catch (e) {
      console.log(e)
    }
  }

  async findOne(query) {
    try {
      return await User.findOne(query)
    } catch (e) {
      console.log(e)
    }
  }

  async create(data) {
    try {
      return await User.create(data)
    } catch (e) {
      console.log(e)
    }
  }

  async update(query, data) {
    try {
      return await User.findOneAndUpdate(query, data, {new: true})
    } catch (e) {
      console.log(e)
    }
  }

  async delete(query) {
    try {
      return await User.findOneAndDelete(query)
    } catch (e) {
      console.log(e)
    }
  }
}

module.exports = UserService
