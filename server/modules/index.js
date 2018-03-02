import Router from 'koa-router'
import auth from './auth'
import summaries from './summaries'
import user from './users'

const router = new Router({ prefix: '/api' })
router.use(auth)
router.use(summaries)
router.use(user)

export default router.routes()
