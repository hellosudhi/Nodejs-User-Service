const express = require('express')
const mongoose = require('mongoose')
const user = require('./Model/User.js')
const cors = require('cors')
const app = express()

app.use(express.json())
app.use(cors)
const port = process.env.PORT || 9000
const connection_Url = `mongodb+srv://onelove:UcM4ba1oknY6jlXj@onelove.ckjpe.gcp.mongodb.net/userDb?retryWrites=true&w=majority`
mongoose.connect(connection_Url, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
})
var db = mongoose.connection
app.get('/vapaus', (request, response) => {
  response.send('this is working')
})
app.get('/user', (request, response) => {
  user
    .find((error, data) => {
      if (error) {
        response.status(500).send(error)
      } else {
        response.status(201).send(data)
      }
    })
    .catch((er) => console.log(er))
})

app.post('/user/new', (request, response) => {
  const User = request.body
  user
    .create(User, (error, data) => {
      if (error) {
        response.status(500).send(error)
      } else {
        response.status(201).send(data)
      }
    })
    .catch((er) => console.log(er))
})

app.listen(port, () => console.log(`Running server on ${port}`))
