import { ManagementRepository } from '../../repository/interfaces/interface-management-repository';
import { beforeEach, describe, expect, it } from 'vitest';
import { InMemoryManagement } from '../../repository/in-memory/in-memory-management';
import { hash } from 'bcryptjs';
import { LoginManagerService } from './login-manager-service';
import { LoginTokenValidationService } from './login-token-validation-service';
import { InvalidTokenError } from '../../utils/errors/invalid-token-error';

let managementRepository: ManagementRepository
let sut: LoginTokenValidationService
let loginService: LoginManagerService

describe('Token Validation Service', () => {

    beforeEach(async ()=>{
        managementRepository = new InMemoryManagement()
        loginService = new LoginManagerService(managementRepository)
        sut = new LoginTokenValidationService()

        const password_hash = await hash("123456", 6)
        managementRepository.register({
            name: "Yan Gabriel", 
            email: "yan@email.com", 
            password: password_hash
        })
    })

    it('should be able to login with token', async () => {
        const { token } = await loginService.handler({
            email: "yan@email.com",
            password: "123456"
        })
        
        const { id } = await sut.handler({token})
        expect(id).toEqual(expect.any(String))
    })

    it('should not be able to login with invalid token', async () => {
        const { token } = await loginService.handler({
            email: "yan@email.com",
            password: "123456"
        })

        const invalidToken = token + "invalid_1234"

        await expect(() => sut.handler({token: invalidToken}))
        .rejects.toBeInstanceOf(InvalidTokenError)
    })
})