const Category = require('./../models/categoryModel')

class CategoryService {
  async find(query) {
    try {
      return await Category.find(query)
    } catch (e) {
      console.log(e)
    }
  }

  async findOne(query) {
    try {
      return await Category.findOne(query)
    } catch (e) {
      console.log(e)
    }
  }

  async create(data) {
    try {
      return await Category.create(data)
    } catch (e) {
      console.log(e)
    }
  }

  async update(query, data) {
    try {
      return await Category.findOneAndUpdate(query, data, {new: true})
    } catch (e) {
      console.log(e)
    }
  }

  async delete(query) {
    try {
      return await Category.findOneAndDelete(query)
    } catch (e) {
      console.log(e)
    }
  }
}

module.exports = CategoryService
