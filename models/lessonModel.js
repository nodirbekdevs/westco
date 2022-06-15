const {Schema, model} = require('mongoose')

const Lesson = model('Lesson', new Schema({
  added_by: {type: Schema.Types.ObjectId, ref: 'User'},
  course: {type: Schema.Types.ObjectId, ref: 'Course'},
  name: {type: String, required: true},
  description: {type: String, required: true},
  image: {type: String, default: ''},
  video: {type: String, default: ''},
}, {timestamps: true}))

module.exports = Lesson
