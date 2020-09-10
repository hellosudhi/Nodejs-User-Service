const express = require('express')
const mongoose = require('mongoose')
const user = require('./Model/User.js')
const app = express()

app.use(express.json())

const port = process.env.PORT || 9000

require('./Config/DBConnection')()
app.get('/vapaus', (request, response) => {
  response.send('this is working user service ')
})
app.get('/user', async (request, response) => {
  await user
    .find({}, (error, data) => {
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

app.listen(port, (error) => console.log(`Running server on ${port}==>${error}`))
