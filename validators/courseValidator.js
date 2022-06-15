const {object, string} = require('joi')

createSchema = object({
  name: string().required(),
  description: string().required(),
  image: string().required(),
  video: string().required(),
})

updateSchema = object({
  name: string(),
  description: string(),
  image: string(),
  video: string()
})


const create = async (req, res, next) => {
  const {error} = createSchema.validate(req.body)
  return error ? next(error) : next()
}

const update = async (req, res, next) => {
  const {error} = updateSchema.validate(req.body)
  return error ? next(error) : next()
}

module.exports = {create, update}
