export class Unauthorized extends Error {
  constructor () {
    super('Unauthorized error')
    this.name = 'UnauthorizedError'
  }
}
