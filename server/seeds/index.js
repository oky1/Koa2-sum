import { MONGO_URI } from '../config'
import mongoose from 'mongoose'
import initConnection from '../env/mongoose/mongooseConnection'
import userSeeds from './user-sedds'
import summarySeeds from './summary-seeds'

async function initSeeds() {
  const runmongo = await initConnection(MONGO_URI)
  console.log(runmongo)
  mongoose.connection.db.dropDatabase()
  try {
    const users = await userSeeds()
    const summary = await summarySeeds(users)
    console.log(users)
    console.log(summary)
  } catch (e) {
    console.log(e)
  } finally {
    mongoose.connection.close()
  }
}

initSeeds()