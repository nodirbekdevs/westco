const {Schema, model} = require('mongoose')

const Book = model('Book', new Schema({
  added_by: {type: Schema.Types.ObjectId, ref: 'User'},
  library: {type: Schema.Types.ObjectId, ref: 'Library'},
  category: {type: Schema.Types.ObjectId, ref: 'Category'},
  name: {type: String, required: true},
  description: {type: String, required: true},
  image: {type: String, default: ''}
}, {timestamps: true}))

module.exports = Book
