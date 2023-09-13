import { beforeEach, describe, expect, it } from 'vitest';
import { DeleteAuthorsService } from './delete-authors-service';
import { DatabaseMemory, InMemoryDatabase } from '../../../repository/in-memory/in-memory-database';
import { AdminGetAuthorsService } from './admin-get-authors-service';

let database: DatabaseMemory;
let sut: AdminGetAuthorsService

describe('Get Authors Service', () => {

    beforeEach(()=>{
        database = new InMemoryDatabase()
        sut = new AdminGetAuthorsService(database.management)
    })

    it('should be able to get Authors', async () => {

        await database.management.register({
            name: "Jonh Doe",
            email: "johnDoe@email.com",
            password: "123456"
        })
        const authors = await sut.handler()

        expect(authors).toEqual(expect.any(Array))
    })

    

    
})