import Router from 'koa-router'
import summaryController from './summaryController'
import checkUser from '../../handlers/checkUser'
// import summaryModel from './summaryModel'
import checkSummary from './checkSummary.js'

const router = new Router({ prefix: '/summaries' })
router
  .post('/', checkUser(), summaryController.create)
  .get('/', summaryController.searchSummaries)
  .param('hash', checkSummary())
  .put('/:hash', checkUser(), summaryController.update)
  .delete('/:hash', checkUser(), summaryController.delete)
  .get('/:hash', summaryController.getSummary)


export default router.routes()
