import config from 'config'
import dotenv from 'dotenv'
import constants from './env/constants'

dotenv.config()

const ENV = process.env.NODE_ENV || 'development'
const IS_DEV = ENV === constants.development
const IS_PROD = ENV === constants.production
const PORT = process.env.PORT || config.get('port')
const MONGO_URI = process.env.MONGO_URI || config.get('mongo.uri')
const JWT_SECRET = config.get('jwt.secret')

if (!constants[ENV]) {
  throw Error('No such env variable')
}

if (!JWT_SECRET) {
  throw Error('You must pass jwt secret string')
}

export { ENV, IS_DEV, IS_PROD, PORT, MONGO_URI, JWT_SECRET }
