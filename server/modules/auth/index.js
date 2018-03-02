import Router from 'koa-router'
import auth from './auth'
import checkUser from '../../handlers/checkUser'


const router = new Router({ prefix: '/auth' })
router
  .post('/signup', auth.signUp)
  .post('/signin', auth.signIn)
  .get('/user', checkUser(), auth.getCurrentUser)

export default router.routes()
