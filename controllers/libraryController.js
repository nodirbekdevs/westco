const storage = require('./../services/main')

const getAll = async (req, res, next) => {
  const libraries = await storage.library.find(req.query)

  res.status(200).json({success: true, data: libraries})
}

const getOne = async (req, res, next) => {
  const library = await storage.library.findOne({_id: req.params.id})

  if (!library) {
    return res.status(404).json({success: false, data: "Kutubxona topilmadi"})
  }

  return res.status(200).json({success: true, data: library})
}

const makeOne = async (req, res, next) => {
  const {id, type} = req.user, {category} = req.body
  req.body.added_by = id

  if (type === 'admin') {
    if (category) {
      await storage.category.update({_id: category}, {$inc: {total_libraries: 1}})
    }

    const library = await storage.library.create(req.body)

    if (library) {
      return res.status(200).json({success: true, data: library})
    } else {
      return res.status(404).json({success: false})
    }
  }

  return res.status(404).json({success: false})
}

const updateOne = async (req, res, next) => {
  const {type} = req.user, {_id} = req.params, {category} = req.body

  const exist_library = await storage.library.findOne({_id})

  if (type === 'admin' && exist_library) {

    if (category) {
      if (exist_library.category !== category) {
        await storage.category.update({_id: exist_library.category}, {$inc: {total_libraries: -1}})
        await storage.category.update({_id: category}, {$inc: {total_libraries: 1}})
      }
    }

    const library = await storage.library.update({_id}, req.body)

    if (library) {
      return res.status(200).json({success: true, data: lesson})
    } else {
      return res.status(404).json({success: false})
    }
  }

  return res.status(404).json({success: false})
}

const addLibraryToUser = async (req, res, next) => {
  const {id, type} = req.user, {library} = req.body

  const user = await storage.user.findOne({_id: id})
  const exist_library = await storage.library.findOne({_id: library})

  if (!user || !exist_library || type !== 'student') {
    return res.status(404).json({success: false})
  }

  user.libraries.push(exist_library._id)
  user.total_libraries += 1
  await user.save()

  await storage.library.update({_id: exist_library._id}, {$inc: {total_students: 1}})

  return res.status(200).json({success: true, data: user})
}

const removeLibraryFromUser = async (req, res, next) => {
  const {id, type} = req.user, {library} = req.body

  const user = await storage.user.findOne({_id: id})
  const exist_library = await storage.library.findOne({_id: library})

  if (!user || !exist_library || type !== 'student') {
    return res.status(404).json({success: false})
  }

  user.libraries.splice(exist_library._id)
  user.total_libraries -= 1
  await user.save()

  await storage.library.update({_id: exist_library._id}, {$inc: {total_students: -1}})

  return res.status(200).json({success: true, data: user})
}

const deleteOne = async (req, res, next) => {
  const {type} = req.user, {_id} = req.params

  const library = await storage.library.findOne({_id})

  if (type === 'admin' && library) {
    if (library.total_books > 0 || library.books.length > 0) {
      return res.status(404).json({success: false})
    }

    if (library.category) {
      await storage.category.update({_id: library.category}, {$inc: {total_libraries: -1}})
    }

    await storage.lesson.delete({_id})

    return res.status(200).json({success: true})
  }

  return res.status(404).json({success: false})
}

module.exports = {getAll, getOne, makeOne, updateOne, addLibraryToUser, removeLibraryFromUser, deleteOne}
