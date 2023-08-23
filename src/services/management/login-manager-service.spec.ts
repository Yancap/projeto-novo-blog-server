import { ManagementRepository } from '../../repository/interfaces/interface-management-repository';
import { beforeEach, describe, expect, it } from 'vitest';
import { InMemoryManagement } from '../../repository/in-memory/in-memory-management';
import { hash } from 'bcryptjs';
import { LoginManagerService } from './login-manager-service';
import { InvalidCredentialsError } from '../../utils/errors/invalid-credentials-error';

let managementRepository: ManagementRepository
let sut: LoginManagerService

describe('Login Management Service', () => {

    beforeEach(async ()=>{
        managementRepository = new InMemoryManagement()
        sut = new LoginManagerService(managementRepository)

        const password_hash = await hash("123456", 6)
        managementRepository.register({
            name: "Yan Gabriel", 
            email: "yan@email.com", 
            password: password_hash
        })
    })

    it('should be able to login with email and password', async () => {
        const { manager }  = await sut.handler({
            email: "yan@email.com",
            password: "123456"
        })
        expect(manager.id).toEqual(expect.any(String))
    })

    it('should not be able to login with wrong email', async () => {
        await expect(() => sut.handler({
            email: "joao@email.com",
            password: "123456"
        })).rejects.toBeInstanceOf(InvalidCredentialsError)
    })

    it('should not be able to login with wrong password', async () => {
        await expect(() => sut.handler({
            email: "yan@email.com",
            password: "123"
        })).rejects.toBeInstanceOf(InvalidCredentialsError)
    })

})