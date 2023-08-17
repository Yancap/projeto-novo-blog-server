import { beforeEach, describe, expect, it } from 'vitest';
import { EmailAlreadyExistsError } from '../../utils/errors/email-already-exists-error';
import { UsersRepository } from '../../repository/interfaces/interface-users-repository';
import { InMemoryUsers } from '../../repository/in-memory/in-memory-users';
import { RegisterUsersService } from './register-users-service';

let usersRepository: UsersRepository
let sut: RegisterUsersService

describe('Register Management Service', () => {

    beforeEach(()=>{
        usersRepository = new InMemoryUsers()
        sut = new RegisterUsersService(usersRepository)
    })

    it('should be able to register a User', async () => {
        const manager  = await sut.handler({
            name: "Yan Gabriel",
            email: "yan@email.com",
            avatar: "image.png"
        })
        expect(manager.id).toEqual(expect.any(String))
    })

    it('should not be able to register a Manager with two email', async () => {
        await sut.handler({
            name: "Yan Gabriel",
            email: "yan@email.com",
            avatar: "image.png"
        })
        await expect(() => sut.handler({
            name: "Yan Gabriel",
            email: "yan@email.com",
            avatar: "image.png"
        })).rejects.toBeInstanceOf(EmailAlreadyExistsError)
    })
})