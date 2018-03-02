import pick from 'lodash/pick'
import summaryModel from './summaryModel'
import summaryService from './summaryService'

export default {
  async create(ctx) {
    const summaryData = {
      ...pick(ctx.request.body, summaryModel.createFields),
      userHash: ctx.state.user.hash
    }
    const { _id } = await summaryService.createSummary(summaryData)
    const summary = await summaryModel.findOne({ _id })
    ctx.status = 201
    ctx.body = { data: summary }
  },

  async update(ctx) {
    const { request: { body }, state: { user: { hash }, summary } } = ctx
    if (summary.userHash !== hash) {
      ctx.throw(
        403, `Forbidden. Summary with hash "${summary.hash}" don\' belong user with hash "${hash}"`
      )
    }
    const newData = pick(body, summaryModel.createFields)
    const updatedSummary = await summaryService.updateSummary(newData, summary)
    // await
    ctx.body = { data: updatedSummary }
  },

  async delete(ctx) {
    const { state: { user: { hash }, summary } } = ctx
    if (summary.userHash !== hash) {
      ctx.throw(
        403, `Forbidden. Summary with hash "${summary.hash}" don\'t belong user with hash "${hash}"`
      )
    }
    await summary.remove()
    ctx.body = { data: { hash: summary.hash } }
  },

  getSummary(ctx) {
    const { state: { summary } } = ctx
    ctx.body = { data: pick(summary, summaryModel.createFields) }
  },

  async searchSummaries(ctx) {
    const MAX_SIZE = 20
    const PAGE = 1
    const queryParams = pick(ctx.request.query, ['title', 'tags', 'size', 'page'])
    const filter = {
      title: queryParams.tittle ? queryParams.tittle : '',
      tags: queryParams.tags ? queryParams.tags.split(',') : [],
      /* eslint-disable */
      size: parseInt(queryParams.size),
      page: parseInt(queryParams.page)
    }
    if (!filter.size || filter.size > MAX_SIZE) {
      filter.size = MAX_SIZE
    }
    if (!filter.page) {
      filter.page = PAGE
    }
    const { summaries, ...rest } = await summaryService.search(filter)
    ctx.body = {
      data: summaries,
      filter,
      ...rest
    }
  }
}
