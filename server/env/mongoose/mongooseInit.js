import { MONGO_URI } from '../../config'
import server from '../../server'
import initConnection from './mongooseConnection'

export default async function () {
  try {
    await initConnection(MONGO_URI)
  } catch (err) {
    server.close()
    console.log(err)
  }
}
