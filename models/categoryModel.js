const {Schema, model} = require('mongoose')

const Category = model('Category', new Schema({
  name: {type: String, required: true},
  description: {type: String, required: true},
  total_libraries: {type: Number, default: 0},
  total_books: {type: Number, default: 0},
}, {timestamps: true}))

module.exports = Category
