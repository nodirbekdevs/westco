const Lesson = require('./../models/lessonModel')

class LessonService {
  async find(query) {
    try {
      return await Lesson.find(query)
    } catch (e) {
      console.log(e)
    }
  }

  async findOne(query) {
    try {
      return await Lesson.findOne(query)
    } catch (e) {
      console.log(e)
    }
  }

  async create(data) {
    try {
      return await Lesson.create(data)
    } catch (e) {
      console.log(e)
    }
  }

  async update(query, data) {
    try {
      return await Lesson.findOneAndUpdate(query, data, {new: true})
    } catch (e) {
      console.log(e)
    }
  }

  async delete(query) {
    try {
      return await Lesson.findOneAndDelete(query)
    } catch (e) {
      console.log(e)
    }
  }
}

module.exports = LessonService
