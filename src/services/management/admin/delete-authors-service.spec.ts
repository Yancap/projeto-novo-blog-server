import { beforeEach, describe, expect, it } from 'vitest';
import { DeleteAuthorsService } from './delete-authors-service';
import { DatabaseMemory, InMemoryDatabase } from '../../../repository/in-memory/in-memory-database';

let database: DatabaseMemory;
let sut: DeleteAuthorsService

describe('Delete Author Service', () => {

    beforeEach(()=>{
        database = new InMemoryDatabase()
        sut = new DeleteAuthorsService(database.management)
    })

    it('should be able to delete a Author', async () => {
        const admin = await database.management.register({
            id: "admin-01",
            name: "Yan Gabriel",
            email: "yan@email.com",
            password: "123456",
            hierarchy: "admin"
        })

        const author  = await database.management.register({
            name: "Jonh Doe",
            email: "johnDoe@email.com",
            password: "123456"
        })
        const isDelete = await sut.handler({author_id: author.id})

        expect(isDelete).toEqual(true)
    })

    

    
})