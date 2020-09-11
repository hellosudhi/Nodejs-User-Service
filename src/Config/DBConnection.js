const mongoose = require('mongoose')

// const connection_Url = `mongodb://mongoose-mongo.mongoose,mongoose-mongo-1.mongo,mongoose-mongo-2.mongo:27017/userDB`
const connection_Url = `mongodb://dXNlcm5hbWU=:cGFzc3dvcmQ=@mongoose-mongo-0.mongoose-service.database.svc.cluster.local,mongoose-mongo-1.mongoose-service.database.svc.cluster.local,mongoose-mongo-2.mongoose-service.database.svc.cluster.local:27017/[db]?replicaSet=rs0&authSource=admin`
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
