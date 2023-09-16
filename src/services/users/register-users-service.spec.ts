import { beforeEach, describe, expect, it } from 'vitest';
import { EmailAlreadyExistsError } from '../../utils/errors/email-already-exists-error';
import { RegisterUsersService } from './register-users-service';
import { DatabaseMemory, InMemoryDatabase } from '../../repository/in-memory/in-memory-database';

let database: DatabaseMemory;
let sut: RegisterUsersService

describe('Register Users Service', () => {

    beforeEach(()=>{
        database = new InMemoryDatabase()
        sut = new RegisterUsersService(database.users)
    })

    it('should be able to register a User', async () => {
        const user  = await sut.handler({
            name: "Yan Gabriel",
            email: "yan@email.com",
            avatar: "image.png"
        })
        expect(user.id).toEqual(expect.any(String))
    })

    it('should not be able to register a User with two email', async () => {
        const firstUser = await sut.handler({
            name: "Yan Gabriel",
            email: "yan@email.com",
            avatar: "image.png"
        })
        const secondUser = await sut.handler({
            name: "Yan Gabriel",
            email: "yan@email.com",
            avatar: "image.png"
        })
        expect(firstUser).toBe(secondUser)
    })
})