import Router from 'koa-router'
import checkUserByHash from './checkUserByHash'
// import checkUser from '../../handlers/checkUser'
import userController from './userController'

const router = new Router({ prefix: '/user' })
router
  .param('hash', checkUserByHash())
  .get('/:hash/summaries', userController.getSummariesByUserHash)

export default router.routes()
