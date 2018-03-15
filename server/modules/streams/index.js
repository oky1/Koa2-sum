import Router from 'koa-router'
import toUpperCaseStream from './transform'

const router = new Router({ prefix: '/streams' })
router
  .post('/text', toUpperCaseStream())

export default router.routes()
