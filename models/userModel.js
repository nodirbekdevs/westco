const {Schema, model} = require('mongoose')

const User = model('User', new Schema({
  username: {type: String, required: true, unique: true},
  password: {type: String, required: true},
  firstName: {type: String, default: ''},
  lastName: {type: String, default: ''},
  phone: {type: String, unique: true, default: ''},
  courses: [{type: Schema.Types.ObjectId, ref: 'Course'}],
  total_courses: {type: Number, default: 0},
  libraries: [{type: Schema.Types.ObjectId, ref: 'Library'}],
  total_libraries: {type: Number, default: 0},
  status: {type: String, enum: ['student', 'admin', 'super_admin']},
  isActive: {type: Boolean, default: true}
}, {timestamps: true}))

module.exports = User
