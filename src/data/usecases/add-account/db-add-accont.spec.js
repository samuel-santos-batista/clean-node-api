"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const db_add_account_1 = require("./db-add-account");
const makeAddAccountRepository = () => {
    class AddAccountRepositoryStub {
        add(accountData) {
            return new Promise(resolve => resolve(makeFakeAccount()));
        }
    }
    return new AddAccountRepositoryStub();
};
const makeHasher = () => {
    class HasherStub {
        hash(value) {
            return new Promise(resolve => resolve('hashed_password'));
        }
    }
    return new HasherStub();
};
const makeFakeAccount = () => ({
    id: 'valid_id',
    name: 'valid_name',
    email: 'valid_email',
    password: 'hashed_password'
});
const makeFakeAccountData = () => ({
    name: 'valid_name',
    email: 'valid_email',
    password: 'valid_password'
});
const makeSut = () => {
    const hasherStub = makeHasher();
    const addAccountRepositoryStub = makeAddAccountRepository();
    const sut = new db_add_account_1.DbAddAccount(hasherStub, addAccountRepositoryStub);
    return {
        sut,
        hasherStub,
        addAccountRepositoryStub
    };
};
describe('DbAddAccount UseCase', () => {
    test('Should call Hasher with correct password', async () => {
        const { sut, hasherStub } = makeSut();
        const hasherSpy = jest.spyOn(hasherStub, 'hash');
        await sut.add(makeFakeAccountData());
        expect(hasherSpy).toHaveBeenCalledWith('valid_password');
    });
    test('Should throw if Hasher with correct throws', async () => {
        const { sut, hasherStub } = makeSut();
        jest.spyOn(hasherStub, 'hash').mockReturnValueOnce(new Promise((resolve, reject) => reject(new Error())));
        const promise = sut.add(makeFakeAccountData());
        await expect(promise).rejects.toThrow();
    });
    test('Should call AddAccountRepository with correct values', async () => {
        const { sut, addAccountRepositoryStub } = makeSut();
        const addSpy = jest.spyOn(addAccountRepositoryStub, 'add');
        await sut.add(makeFakeAccountData());
        expect(addSpy).toHaveBeenCalledWith({
            name: 'valid_name',
            email: 'valid_email',
            password: 'hashed_password'
        });
    });
    test('Should throw if AddAccountRepository throws', async () => {
        const { sut, addAccountRepositoryStub } = makeSut();
        jest.spyOn(addAccountRepositoryStub, 'add').mockReturnValueOnce(new Promise((resolve, reject) => reject(new Error())));
        const promise = sut.add(makeFakeAccountData());
        await expect(promise).rejects.toThrow();
    });
    test('Should return an account if on success', async () => {
        const { sut } = makeSut();
        const account = await sut.add(makeFakeAccountData());
        expect(account).toEqual(makeFakeAccount());
    });
});
