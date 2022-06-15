const Course = require('./../models/courseModel')

class CourseService {
  async find(query) {
    try {
      return await Course.find(query)
    } catch (e) {
      console.log(e)
    }
  }

  async findOne(query) {
    try {
      return await Course.findOne(query)
    } catch (e) {
      console.log(e)
    }
  }

  async create(data) {
    try {
      return await Course.create(data)
    } catch (e) {
      console.log(e)
    }
  }

  async update(query, data) {
    try {
      return await Course.findOneAndUpdate(query, data, {new: true})
    } catch (e) {
      console.log(e)
    }
  }

  async delete(query) {
    try {
      return await Course.findOneAndDelete(query)
    } catch (e) {
      console.log(e)
    }
  }
}

module.exports = CourseService
