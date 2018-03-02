import jwtService from '../services/jwt'
import User from '../modules/users/userModel'

// ctx.headers.authorization // where token lies
export default () => async (ctx, next) => {
  const { authorization } = ctx.headers
  if (authorization) {
    try {
      const { email } = jwtService.verifyToken(authorization)
      ctx.state.user = await User.findOne({ email })
    } catch (e) {
      ctx.throw(401, { message: 'Invalid token' })
    }
  }
  await next()
}


