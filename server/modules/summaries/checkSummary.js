import summaryModel from './summaryModel'

export default () => async (hash, ctx, next) => {
  const summary = await summaryModel.findOne({ hash })
  if (!summary) {
    ctx.throw(404, `summary with "${hash}" not found`)
  }
  ctx.state.summary = summary
  await next()
}
