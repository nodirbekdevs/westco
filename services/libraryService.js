const Library = require('./../models/libraryModel')

class LibraryService {
  async find(query) {
    try {
      return await Library.find(query)
    } catch (e) {
      console.log(e)
    }
  }

  async findOne(query) {
    try {
      return await Library.findOne(query)
    } catch (e) {
      console.log(e)
    }
  }

  async create(data) {
    try {
      return await Library.create(data)
    } catch (e) {
      console.log(e)
    }
  }

  async update(query, data) {
    try {
      return await Library.findOneAndUpdate(query, data, {new: true})
    } catch (e) {
      console.log(e)
    }
  }

  async delete(query) {
    try {
      return await Library.findOneAndDelete(query)
    } catch (e) {
      console.log(e)
    }
  }
}

module.exports = LibraryService
