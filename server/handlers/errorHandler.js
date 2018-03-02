export default () => async (ctx, next) => {
  try {
    await next()
  } catch ({ status = 500, message = 'Internal server error', name, errors }) {
    if (name === 'ValidationError') {
      ctx.status = 400
      ctx.body = {
        errors: Object.values(errors).reduce((allErr, err) => ({
          ...allErr,
          [err.path]: err.message
        }), {})
      }
    } else {
      ctx.status = status
      ctx.body = { status, message }
    }
  }
}
