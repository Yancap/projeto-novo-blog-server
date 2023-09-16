import { beforeEach, describe, expect, it } from 'vitest';
import { DatabaseMemory, InMemoryDatabase } from '../../repository/in-memory/in-memory-database';
import { GetUsersByEmailService } from './get-users-by-email-service';

let database: DatabaseMemory;
let sut: GetUsersByEmailService

describe('Get Users By Email Service', () => {

    beforeEach(()=>{
        database = new InMemoryDatabase()
        sut = new GetUsersByEmailService(database.users)
    })

    it('should be able to get a User by email', async () => {
        const user  = await database.users.register({
            name: "Yan Gabriel",
            email: "yan@email.com",
            avatar: "image.png"
        })

        const getUser = await sut.handler({email: user.email})
        expect(getUser).toEqual(expect.any(Object))
        expect(getUser).toMatchObject(user)
    })

    it('should not be able to get a inexistent user', async () => {

        const getUser = await sut.handler({email: "notExist@email.com"})
        expect(getUser).toBeNull()
    })
})