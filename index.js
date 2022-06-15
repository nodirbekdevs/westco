const app = require('express')()
const db = require('./utils/db')
const middleware = require('./middleware/middleware')
const {PORT} = require('./utils/keys')

middleware(app)

const start = async () => {
  try {
    await db
    app.listen(PORT, () => {console.log(`Server running on http://localhost:${PORT} port`)})
  } catch (error) {
    console.log(`Mistake is ${error}`)
  }
}

start()
