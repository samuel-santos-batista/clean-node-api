import { Collection } from 'mongodb'
import { MongoHelper } from '../helpers/mongo-helper'
import { LogMongoRepository } from './log'

describe('Log Mongo Repository', () => {
  let errorColletion: Collection
  beforeAll(async () => {
    await MongoHelper.connect(process.env.MONGO_URL)
  })

  afterAll(async () => {
    await MongoHelper.disconnect()
  })

  beforeEach(async () => {
    errorColletion = await MongoHelper.getCollection('errors')
    await errorColletion.deleteMany({})
  })

  test('Should create an error on success', async () => {
    const sut = new LogMongoRepository()
    await sut.logError('any_stack')
    const count = await errorColletion.countDocuments()
    expect(count).toBe(1)
  })
})
