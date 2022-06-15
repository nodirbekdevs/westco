const {Schema, model} = require('mongoose')

const Library = model('Library', new Schema({
  added_by: {type: Schema.Types.ObjectId, ref: 'User'},
  name: {type: String, required: true},
  description: {type: String, required: true},
  books: [{type: Schema.Types.ObjectId, ref: 'Book'}],
  total_books: {type: Number, default: 0},
  total_students: {type: Number, default: 0},
  category: {type: Schema.Types.ObjectId, ref: 'Category'}
}, {timestamps: true}))

module.exports = Library
