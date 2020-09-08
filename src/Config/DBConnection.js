const mongoose = require('mongoose')

const connection_Url = `mongodb+srv://onelove:UcM4ba1oknY6jlXj@onelove.ckjpe.gcp.mongodb.net/userDb?retryWrites=true&w=majority`

module.exports = () => {
  mongoose
    .connect(connection_Url, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
    })
    .then(() => {
      console.log('Mongodb connected....')
    })
    .catch((err) => console.log(err.message))

  mongoose.connection.on('connected', () => {
    console.log('Mongoose connected to db...')
  })

  mongoose.connection.on('error', (err) => {
    console.log(err.message)
  })

  mongoose.connection.on('disconnected', () => {
    console.log('Mongoose connection is disconnected...')
  })

  process.on('SIGINT', () => {
    mongoose.connection.close(() => {
      console.log(
        'Mongoose connection is disconnected due to app termination...',
      )
      process.exit(0)
    })
  })
}
