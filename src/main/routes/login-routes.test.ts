import { Collection } from 'mongodb'
import request from 'supertest'
import { hash } from 'bcrypt'
import { MongoHelper } from '../../infra/db/mongodb/helpers/mongo-helper'
import app from '../config/app'

let accountColletion: Collection
describe('Login Routes', () => {
  beforeAll(async () => {
    await MongoHelper.connect(process.env.MONGO_URL)
  })

  afterAll(async () => {
    await MongoHelper.disconnect()
  })

  beforeEach(async () => {
    accountColletion = await MongoHelper.getCollection('accounts')
    await accountColletion.deleteMany({})
  })

  describe('POST /signup', () => {
    test('Should return 200 on signup', async () => {
      await request(app)
        .post('/api/signup')
        .send({
          name: 'Samuel',
          email: 'samuelsantxxi@mail.com',
          password: '123',
          passwordConfirmation: '123'
        })
        .expect(200)
    })
  })

  describe('POST /login', () => {
    test('Should return 200 on login', async () => {
      const password = await hash('123', 12)
      await accountColletion.insertOne({
        name: 'Samuel',
        email: 'samuelsantxxi@mail.com',
        password
      })
      await request(app)
        .post('/api/login')
        .send({
          email: 'samuelsantxxi@mail.com',
          password: '123'
        })
        .expect(200)
    })
  })
})
