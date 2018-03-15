import send from 'koa-send'

export default () => async ctx => {
  try {
    ctx.body = 'Try GET /logo.png'
    await send(ctx, '/logo.png', { root: __dirname })
  } catch (err) {
    ctx.throw(err, 'canno\'t send')
  }
}
