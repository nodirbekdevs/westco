const Book = require('./../models/bookModel')

class BookService {
  async find(query) {
    try {
      return await Book.find(query)
    } catch (e) {
      console.log(e)
    }
  }

  async findOne(query) {
    try {
      return await Book.findOne(query)
    } catch (e) {
      console.log(e)
    }
  }

  async create(data) {
    try {
      return await Book.create(data)
    } catch (e) {
      console.log(e)
    }
  }

  async update(query, data) {
    try {
      return await Book.findOneAndUpdate(query, data, {new: true})
    } catch (e) {
      console.log(e)
    }
  }

  async delete(query) {
    try {
      return await Book.findOneAndDelete(query)
    } catch (e) {
      console.log(e)
    }
  }
}

module.exports = BookService
