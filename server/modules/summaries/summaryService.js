import Summary from './summaryModel'

export default {
  async createSummary(data) {
    const { userHash } = data
    const countSummariesById = await Summary.count({ userHash })
    if (countSummariesById >= 3) {
      throw new AppError({ status: 400, message: 'User cannot create more then 3 summary' })
    }
    return Summary.create(data)
  },

  updateSummary(data, summary) {
    summary.set(data)
    try {
      return summary.save()
    } catch (e) {
      throw new AppError({ status: 400, ...e })
    }
  },

  async search({ title, tags, size, page }) {
    const query = {
      title: { $regex: title }
    }
    if (tags.length) {
      query.tags = { $in: tags }
    }

    const count = await Summary
      .count(query)
      .sort({ updatedAt: '-1' })

    let pages = count / size

    if (pages.toString().indexOf('.') !== -1) {
      /* eslint-disable */
      pages = parseInt(pages) + 1
    }

    const summaries = await Summary
      .find(query)
      .sort({ updatedAt: '-1' })
      .limit(size)
      .skip((page - 1) * size)

    return { summaries, count, pages, page}
  }
}
