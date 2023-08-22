import { beforeEach, describe, expect, it } from 'vitest';
import { DeleteAuthorsService } from './delete-authors-service';
import { ManagementRepository } from '../../../repository/interfaces/interface-management-repository';
import { InMemoryManagement } from '../../../repository/in-memory/in-memory-management';
import { OnlyAdminError } from '../../../utils/errors/only-admin-error';

let managementRepository: ManagementRepository
let sut: DeleteAuthorsService

describe('Delete Author Service', () => {

    beforeEach(()=>{
        managementRepository = new InMemoryManagement()
        sut = new DeleteAuthorsService(managementRepository)
    })

    it('should be able to delete a Author', async () => {
        const admin = await managementRepository.register({
            id: "admin-01",
            name: "Yan Gabriel",
            email: "yan@email.com",
            password: "123456",
            hierarchy: "admin"
        })

        const author  = await managementRepository.register({
            name: "Jonh Doe",
            email: "johnDoe@email.com",
            password: "123456"
        })
        const isDelete = await sut.handler({author_id: author.id})

        expect(isDelete).toEqual(true)
    })

    

    
})