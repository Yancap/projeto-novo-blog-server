import { beforeEach, describe, expect, it } from 'vitest';
import { hash } from 'bcryptjs';
import { ManagementRepository } from '../../../repository/interfaces/interface-management-repository';
import { LoginTokenValidationService } from '../login-token-validation-service';
import { LoginManagerService } from '../login-manager-service';
import { InMemoryManagement } from '../../../repository/in-memory/in-memory-management';
import { GenerateAdminTokenService } from './generate-admin-token-service';
import { OnlyAdminError } from '../../../utils/errors/only-admin-error';


let managementRepository: ManagementRepository
let sut: GenerateAdminTokenService
let loginService: LoginManagerService

describe('Generation Admin Token Service', () => {

    beforeEach(async ()=>{
        managementRepository = new InMemoryManagement()
        loginService = new LoginManagerService(managementRepository)
        sut = new GenerateAdminTokenService()
    })

    it('should be able to generate admin token', async () => {
        const password_hash = await hash("123456", 6)
        const {hierarchy} = await managementRepository.register({
            name: "Yan Gabriel", 
            email: "yan@email.com", 
            password: password_hash,
            hierarchy: "admin"
        })
        
        const { admin_token } = await sut.handler({hierarchy})
        expect(admin_token).toEqual(expect.any(String))
    })

    it('should not be able to generate admin token if hierarchy is not different from admin', async () => {
        const password_hash = await hash("123456", 6)
        const {hierarchy} = await managementRepository.register({
            name: "Yan Gabriel", 
            email: "yan@email.com", 
            password: password_hash,
            hierarchy: "author"
        })
        
        await expect(() => sut.handler({hierarchy})).rejects.toBeInstanceOf(OnlyAdminError)
    })
})