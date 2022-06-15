const storage = require('./../services/main')

const getAll = async (req, res, next) => {
  const categories = await storage.category.find(req.query)

  res.status(200).json({
    success: true,
    data: categories
  })
}

const getOne = async (req, res, next) => {
  const categories = await storage.category.findOne({_id: req.params.id})

  if (!categories) {
    return res.status(404).json({success: false, data: "Kategoriya topilmadi"})
  }

  return res.status(200).json({success: true, data: categories})
}

const makeOne = async (req, res, next) => {
  const {type} = req.user

  if (type === 'admin') {
    const category = await storage.category.create(req.body)

    if (category) {
      return res.status(200).json({success: true, data: category})
    } else {
      return res.status(404).json({success: false})
    }

  }

  return res.status(404).json({success: false})
}

const updateOne = async (req, res, next) => {
  const {type} = req.user, {_id} = req.params

  const exist_category = await storage.category.findOne({_id})

  if (type === 'admin' && exist_category) {
    const category = await storage.category.update({_id}, req.body)

    if (category) {
      return res.status(200).json({success: true, data: category})
    } else {
      return res.status(404).json({success: false})
    }
  }

  return res.status(404).json({success: false})
}

const deleteOne = async (req, res, next) => {
  const {type} = req.user, {_id} = req.params

  const category = await storage.category.findOne({_id})

  if (type === 'admin' && category) {
    if (category.total_books > 0 || category.total_libraries > 0) {
      return res.status(404).json({success: false})
    }

    await storage.category.delete({_id})

    return res.status(200).json({success: true})
  }

  return res.status(404).json({success: false})
}

module.exports = {getAll, getOne, makeOne, updateOne, deleteOne}
