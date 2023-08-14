import { beforeEach, describe, expect, it } from 'vitest';
import { hash } from 'bcryptjs';
import { ManagementRepository } from '../../../repository/interfaces/interface-management-repository';
import { LoginTokenValidationService } from '../login-token-validation-service';
import { LoginManagerService } from '../login-manager-service';
import { InMemoryManagement } from '../../../repository/in-memory/in-memory-management';
import { GenerateAdminTokenService } from './generate-admin-token-service';
import { AdminTokenValidationService } from './admin-token-validation-service';
import { InvalidTokenError } from '../../../utils/errors/invalid-token-error';


let managementRepository: ManagementRepository
let sut: AdminTokenValidationService
let loginService: LoginManagerService
let generateAdminTokenService: GenerateAdminTokenService

describe('Validation Admin Token Service', () => {

    beforeEach(async ()=>{
        managementRepository = new InMemoryManagement()
        loginService = new LoginManagerService(managementRepository)
        sut = new AdminTokenValidationService()
        generateAdminTokenService = new GenerateAdminTokenService()
    })

    it('should be able to validate admin token', async () => {
        const password_hash = await hash("123456", 6)
        const {hierarchy} = await managementRepository.register({
            name: "Yan Gabriel", 
            email: "yan@email.com", 
            password: password_hash,
            hierarchy: "admin"
        })
        
        const { admin_token: token } = await generateAdminTokenService.handler({hierarchy})
        const { id } = await sut.handler({token})

        expect(id).toEqual(expect.any(String))
    })

    it('should not be able to validate other token', async () => {
        const password_hash = await hash("123456", 6)
        const {email, password} = await managementRepository.register({
            name: "Yan Gabriel", 
            email: "yan@email.com", 
            password: password_hash,
            hierarchy: "author"
        })

        const {token}  = await loginService.handler({
            email: "yan@email.com",
            password: "123456"
        })

        await expect(() => sut.handler({token}))
        .rejects.toBeInstanceOf(InvalidTokenError)
    })
})