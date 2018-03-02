import Koa from 'koa'
import { PORT, IS_DEV } from './config'
import bodyparser from 'koa-bodyparser'
import logger from 'koa-logger'
import errorHandler from './handlers/errorHandler'
import initMongo from './env/mongoose/mongooseInit'
import routing from './modules'
import checkJwt from './handlers/checkJwt'
import AppError from './handlers/appError'


const app = new Koa()

initMongo()
global.AppError = AppError

if (IS_DEV) {
  app.use(logger())
}


app.use(errorHandler())
app.use(bodyparser())
app.use(checkJwt())
app.use(routing)

app.use(async ctx => {
  ctx.body = '<h1>Server works</h1>'
})

const server = app.listen(PORT, err => {
  if (err) {
    throw Error('Can\'t run server')
  } console.log(`Server run on port: ${PORT}`)
})

export default server
