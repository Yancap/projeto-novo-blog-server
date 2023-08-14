import { beforeEach, describe, expect, it } from 'vitest';
import { compare } from 'bcryptjs';
import { DeleteAuthorsService } from './delete-authors';
import { ManagementRepository } from '../../../repository/interfaces/interface-management-repository';
import { InMemoryManagement } from '../../../repository/in-memory/in-memory-management';

let managementRepository: ManagementRepository
let sut: DeleteAuthorsService

describe('Delete Author Service', () => {

    beforeEach(()=>{
        managementRepository = new InMemoryManagement()
        sut = new DeleteAuthorsService(managementRepository)
    })

    it('should be able to delete a Author', async () => {
        const author  = await managementRepository.register({
            name: "Yan Gabriel",
            email: "yan@email.com",
            password: "123456"
        })
        const isDelete = await sut.handler({id: author.id})

        expect(isDelete).toEqual(true)
    })

    it('should not be able to delete a author with non-existent id', async () => {
        const author  = await managementRepository.register({
            name: "Yan Gabriel",
            email: "yan@email.com",
            password: "123456"
        })
        const isDelete = await sut.handler({id: "id-non-existent-123"})

        expect(isDelete).toEqual(true)
    })

    
})