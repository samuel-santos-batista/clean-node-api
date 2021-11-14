import jwt from 'jsonwebtoken'
import { JwtAdapter } from './jwt-adapter'

jest.mock('jsonwebtoken', () => ({
  sign (): string {
    return 'any_token'
  }
}))

describe('Jwt Adapter', () => {
  test('Should call sign with correct values', async () => {
    const signSpy = jest.spyOn(jwt, 'sign')
    const sut = new JwtAdapter('secret')
    await sut.encrypt('any_id')
    expect(signSpy).toHaveBeenCalledWith({ id: 'any_id' }, 'secret')
  })

  test('Should return a token on sign succeeds', async () => {
    const sut = new JwtAdapter('secret')
    const accessToken = await sut.encrypt('any_id')
    expect(accessToken).toBe('any_token')
  })

  test('Should throws if sign throws', async () => {
    jest.spyOn(jwt, 'sign').mockImplementationOnce(() => { throw new Error() })
    const sut = new JwtAdapter('secret')
    const promise = sut.encrypt('any_id')
    expect(promise).rejects.toThrow()
  })
})
