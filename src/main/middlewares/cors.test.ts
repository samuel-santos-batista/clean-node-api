import request from 'supertest'
import app from '../config/app'

describe('CORS Middleware', () => {
  test('Should enabled cors', async () => {
    app.get('/test_cors', (request, reponse) => {
      reponse.send(request.body)
    })
    await request(app)
      .get('/test_cors')
      .expect('access-control-allow-origin', '*')
      .expect('access-control-allow-methods', '*')
      .expect('access-control-allow-headers', '*')
  })
})
