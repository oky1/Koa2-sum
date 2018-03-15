import fs from 'fs'
import Koa from 'koa'
import { PORT, IS_DEV } from './config'
import bodyparser from 'koa-bodyparser'
import logger from 'koa-logger'
import errorHandler from './handlers/errorHandler'
import initMongo from './env/mongoose/mongooseInit'
import routing from './modules'
import checkJwt from './handlers/checkJwt'
import AppError from './handlers/appError'
import koaVideo from './modules/streams/video/video'

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
app.use(koaVideo({ extMatch: /\.mp[3-4]$/i }))

app.use(async ctx => {
  let socket = ctx.socket
  function close() {
    ctx.socket.unpipe(ctx.res)
  }
  socket.on('close', function () {
    close()
  })
  socket.on('error', function (err) {
    close()
    fs.appendFileSync('globalErrors.txt', err + '\n')
  })
  ctx.body = `
  <video width="400" height="240" controls>
   <source src="vid.mp4" type="video/mp4">
   Your browser does not support the video tag.
  </video>
  `
})

const server = app.listen(PORT, err => {
  if (err) {
    throw Error('Can\'t run server')
  } console.log(`Server run on port: ${PORT} `)
})

export default server
