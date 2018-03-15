import Router from 'koa-router'
import auth from './auth'
import summaries from './summaries'
import user from './users'
import stream from './streams/'
import download from './download/'

const router = new Router({ prefix: '/api' })
router.use(auth)
router.use(summaries)
router.use(user)
router.use(stream)
router.use(download)

export default router.routes()
