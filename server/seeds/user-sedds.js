import faker from 'faker'
import _ from 'lodash'
import User from '../modules/users/userModel'

function init() {
  const promises = []
  _.times(20, () => {
    const userPromise = User.create({
      email: `${faker.lorem.word(2, 20)}-${faker.random.number(1, 999)}@${faker.lorem.word(2, 20)}`,
      password: 1111,
      firstName: faker.name.firstName(),
      lastName: faker.name.lastName()
    })
    promises.push(userPromise)
  })
  return Promise.all(promises)
}

export default init
