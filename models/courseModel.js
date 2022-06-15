const {Schema, model} = require('mongoose')

const Course = model('Course', new Schema({
  added_by: {type: Schema.Types.ObjectId, ref: 'User'},
  name: {type: String, required: true},
  description: {type: String, required: true},
  lessons: [{type: Schema.Types.ObjectId, ref: 'Lesson'}],
  total_lessons: {type: Number, default: 0},
  total_students: {type: Number, default: 0},
  image: {type: String, default: ''},
  video: {type: String, default: ''},
}, {timestamps: true}))

module.exports = Course
