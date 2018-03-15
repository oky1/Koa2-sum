import Router from 'koa-router'
import sender from './sender/sender'

const router = new Router({ prefix: '/download' })
router.get('/send', sender())


export default router.routes()
