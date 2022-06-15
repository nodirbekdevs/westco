const {object, string} = require('joi')

createSchema = object({
  username: string().required(),
  password: string().required()
})

updateSchema = object({
  username: string(),
  password: string(),
  first_name: string(),
  last_name: string(),
  phone: string(),
  status: string().valid('student', 'admin', 'super_admin')
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
