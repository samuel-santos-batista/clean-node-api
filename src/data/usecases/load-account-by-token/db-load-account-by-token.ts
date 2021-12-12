import { LoadAccountByToken } from '../../../domain/usecases/load-account-by-token'
import { AccountModel } from '../../../domain/models/account'
import { Decrypter } from '../../protocols/cryptography/decrypter'
import { LoadAccountByTokenRepository } from '../../protocols/db/account/load-account-by-token-repository'

export class DbLoadAccountByToken implements LoadAccountByToken {
  constructor (
    private readonly decrypter: Decrypter,
    private readonly loadAccountByTokenRepository: LoadAccountByTokenRepository

  ) {}

  async load (accessToken: string, role?: string): Promise<AccountModel> {
    this.decrypter.decrypt(accessToken)
    this.loadAccountByTokenRepository.loadByToken(accessToken, role)
    return null
  }
}
