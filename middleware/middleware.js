const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const helmet = require('helmet')
const compression = require('compression')
const Routes = require('./../routes/mainRoute')

const middleware = (app) => {
  app.use(cors())
  app.options('*', cors())
  app.use(express.urlencoded({extended: true}))
  app.use(express.json())
  app.get('env') === 'development' ? app.use(morgan('dev')) : app.use(helmet())
  app.use(compression())
  app.use('/uploads', express.static('uploads'))
  app.use('/api', Routes)
}

module.exports = middleware
