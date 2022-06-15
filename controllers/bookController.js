const storage = require('./../services/main')

const getAll = async (req, res, next) => {
  const books = await storage.book.find(req.query)

  res.status(200).json({
    success: true,
    data: books
  })
}

const getOne = async (req, res, next) => {
  const book = await storage.book.findOne({_id: req.params.id})

  if (!book) {
    return res.status(404).json({success: false, data: "Kitob topilmadi"})
  }

  return res.status(404).json({success: true, data: book})
}

const makeOne = async (req, res, next) => {
  let book
  const {id, type} = req.user
  req.body.added_by = id

  if (type === 'admin') {
    book = await storage.book.create(req.body)

    if (book.category) {
      await storage.category.update({_id: book.category}, {$inc: {total_books: 1}})
    }

    if (book.library) {
      const exist_library = await storage.library.findOne({_id: book.library})

      exist_library.books.push(book._id)
      exist_library.total_books += 1
      await exist_library.save()
    }

    return res.status(200).json({success: true, data: book})
  }

  return res.status(200).json({success: false})
}

const updateOne = async (req, res, next) => {
  let book
  const {type} = req.user, {_id} = req.params, {category, library} = req.body

  const exist_book = await storage.book.findOne({_id})

  if (type === 'admin' && exist_book) {

    if (category.length > 0) {
      if (exist_book.category !== category) {
        await storage.category.update({_id: exist_book.category}, {$inc: {total_books: -1}})
        await storage.category.update({_id: category}, {$inc: {total_books: 1}})
      }
    }

    if (library.length > 0) {
      if (exist_book.library !== library) {
        const old_library = await storage.library.findOne({_id: exist_book.library})
        const new_library = await storage.library.findOne({_id: library})

        if (old_library) {
          old_library.books.splice(exist_book._id)
          old_library.total_books -= 1
          await old_library.save()
        }

        if (new_library) {
          new_library.books.push(exist_book._id)
          new_library.total_books -= 1
          await new_library.save()
        }
      }
    }

    book = await storage.book.update({_id}, req.body)

    if (book) {
      return res.status(200).json({success: true, data: book})
    } else {
      return res.status(404).json({success: false})
    }
  }

  return res.status(404).json({success: false})
}

const deleteOne = async (req, res, next) => {
  const {type} = req.user, {_id} = req.params

  const book = await storage.book.findOne({_id})

  if (type === 'admin' && book) {

    if (book.category) {
      await storage.category.update({_id: book.category}, {$inc: {total_books: -1}})
    }

    if (book.library) {
      const library = await storage.library.findOne({_id: book.library})
      library.books.splice(book._id)
      library.total_books -= 1
      await library.save()
    }

    await storage.book.delete(book._id)

    return res.status(200).json({success: true})
  }

  return res.status(404).json({success: false})
}

module.exports = {getAll, getOne, makeOne, updateOne, deleteOne}
