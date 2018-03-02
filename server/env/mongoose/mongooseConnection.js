import mongoose from 'mongoose'
mongoose.Promise = Promise

export default (mongoUri) => {
  if (!mongoUri) {
    throw Error('wrong mongo path or variable')
  } return mongoose
    .connect(mongoUri)
    .then(data => {
      console.log('Mongo connected')
      return data
    })
}

