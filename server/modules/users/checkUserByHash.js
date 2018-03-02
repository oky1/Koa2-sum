import User from './userModel'

export default () => async (hash, ctx, next) => {
  const user = await User.findOne({ hash })
  if (!user) {
    ctx.throw(404, `User with "${hash}" not found`)
  }
  ctx.state.user = user
  await next()
}

