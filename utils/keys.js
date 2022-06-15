const PORT = 5000
const mongo_url = 'mongodb+srv://admin:admin@cluster0.wcosh.mongodb.net/myFirstDatabase?retryWrites=true&w=majority'
const mongo_options = {useNewUrlParser: true, useUnifiedTopology: true}
const secret_jwt = 'westco-app-jwt'

module.exports = {PORT, mongo_url, mongo_options, secret_jwt}
