"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const db_authentication_1 = require("./db-authentication");
const makeFakeAccount = () => ({
    id: 'any_id',
    email: 'any_email@mail.com',
    name: 'any_name',
    password: 'hashed_password'
});
const makeFakeAuthentication = () => ({
    email: 'any_email@mail.com',
    password: 'any_password'
});
const makeLoadAccountByEmailRepository = () => {
    class LoadAccountByEmailRepositoryStub {
        async loadByEmail(email) {
            return new Promise(resolve => resolve(makeFakeAccount()));
        }
    }
    return new LoadAccountByEmailRepositoryStub();
};
const makeHashComparer = () => {
    class HashComparerStub {
        async compare(value, hash) {
            return new Promise(resolve => resolve(true));
        }
    }
    return new HashComparerStub();
};
const makeEncrypter = () => {
    class EncrypterStub {
        async encrypt(value) {
            return new Promise(resolve => resolve('any_token'));
        }
    }
    return new EncrypterStub();
};
const makeUpdateAccessTokenRepository = () => {
    class UpdateAccessTokenRepositoryStub {
        async updateAccessToken(id, token) {
            return null;
        }
    }
    return new UpdateAccessTokenRepositoryStub();
};
const makeSut = () => {
    const loadAccountByEmailRepositoryStub = makeLoadAccountByEmailRepository();
    const hashComparerStub = makeHashComparer();
    const encrypterStub = makeEncrypter();
    const updateAccessTokenRepositoryStub = makeUpdateAccessTokenRepository();
    const sut = new db_authentication_1.DbAuthentication(loadAccountByEmailRepositoryStub, hashComparerStub, encrypterStub, updateAccessTokenRepositoryStub);
    return {
        sut,
        loadAccountByEmailRepositoryStub,
        hashComparerStub,
        encrypterStub,
        updateAccessTokenRepositoryStub
    };
};
describe('DbAuthentication UseCase', () => {
    test('Should call LoadAccountByEmailRepository with correct email', async () => {
        const { sut, loadAccountByEmailRepositoryStub } = makeSut();
        const loadByEmailSpy = jest.spyOn(loadAccountByEmailRepositoryStub, 'loadByEmail');
        await sut.auth(makeFakeAuthentication());
        expect(loadByEmailSpy).toHaveBeenCalledWith('any_email@mail.com');
    });
    test('Should throw if LoadAccountByEmailRepository throws', async () => {
        const { sut, loadAccountByEmailRepositoryStub } = makeSut();
        jest.spyOn(loadAccountByEmailRepositoryStub, 'loadByEmail').mockReturnValueOnce(new Promise((resolve, reject) => reject(new Error())));
        const promise = sut.auth(makeFakeAuthentication());
        await expect(promise).rejects.toThrow();
    });
    test('Should return null LoadAccountByEmailRepository returns null', async () => {
        const { sut, loadAccountByEmailRepositoryStub } = makeSut();
        jest.spyOn(loadAccountByEmailRepositoryStub, 'loadByEmail').mockReturnValueOnce(null);
        const accessToken = await sut.auth(makeFakeAuthentication());
        expect(accessToken).toBeNull();
    });
    test('Should call HashComparer with correct values', async () => {
        const { sut, hashComparerStub } = makeSut();
        const compareSpy = jest.spyOn(hashComparerStub, 'compare');
        await sut.auth(makeFakeAuthentication());
        expect(compareSpy).toHaveBeenCalledWith('any_password', 'hashed_password');
    });
    test('Should throw if HashComparer throws', async () => {
        const { sut, hashComparerStub } = makeSut();
        jest.spyOn(hashComparerStub, 'compare').mockReturnValueOnce(new Promise((resolve, reject) => reject(new Error())));
        const promise = sut.auth(makeFakeAuthentication());
        await expect(promise).rejects.toThrow();
    });
    test('Should return null HashComparer false', async () => {
        const { sut, hashComparerStub } = makeSut();
        jest.spyOn(hashComparerStub, 'compare').mockReturnValueOnce(new Promise(resolve => resolve(false)));
        const accessToken = await sut.auth(makeFakeAuthentication());
        expect(accessToken).toBeNull();
    });
    test('Should call Encrypter with correct id', async () => {
        const { sut, encrypterStub } = makeSut();
        const genarateSpy = jest.spyOn(encrypterStub, 'encrypt');
        await sut.auth(makeFakeAuthentication());
        expect(genarateSpy).toHaveBeenCalledWith('any_id');
    });
    test('Should throw if Encrypter throws', async () => {
        const { sut, encrypterStub } = makeSut();
        jest.spyOn(encrypterStub, 'encrypt').mockReturnValueOnce(new Promise((resolve, reject) => reject(new Error())));
        const promise = sut.auth(makeFakeAuthentication());
        await expect(promise).rejects.toThrow();
    });
    test('Should return an accessToken if on success', async () => {
        const { sut } = makeSut();
        const accessToken = await sut.auth(makeFakeAuthentication());
        expect(accessToken).toBe('any_token');
    });
    test('Should call UpdateAccessTokenRepository with correct values', async () => {
        const { sut, updateAccessTokenRepositoryStub } = makeSut();
        const updateAccessTokenSpy = jest.spyOn(updateAccessTokenRepositoryStub, 'updateAccessToken');
        await sut.auth(makeFakeAuthentication());
        expect(updateAccessTokenSpy).toHaveBeenCalledWith('any_id', 'any_token');
    });
    test('Should throw if UpdateAccessTokenRepository throws', async () => {
        const { sut, updateAccessTokenRepositoryStub } = makeSut();
        jest.spyOn(updateAccessTokenRepositoryStub, 'updateAccessToken').mockReturnValueOnce(new Promise((resolve, reject) => reject(new Error())));
        const promise = sut.auth(makeFakeAuthentication());
        await expect(promise).rejects.toThrow();
    });
});
