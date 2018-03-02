import faker from 'faker'
import _ from 'lodash'
import Summary from '../modules/summaries/summaryModel'

function init(users) {
  if (!users || !users.length) {
    throw Error('Users is required')
  }
  const promises = []
  _.times(20, () => {
    const summaryPromise = Summary.create({
      title: faker.lorem.words(2, 5),
      description: faker.lorem.lines(4, 10),
      tags: faker.lorem.words(2, 6).split(' '),
      /* eslint-disable */
      userHash: users[faker.random.number(0, 19)].hash
    })
    promises.push(summaryPromise)
  })

  return Promise.all(promises)
}

export default init
