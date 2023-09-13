import { beforeEach, describe, expect, it } from 'vitest';
import { hash } from 'bcryptjs';
import { LoginManagerService } from './login-manager-service';
import { InvalidCredentialsError } from '../../utils/errors/invalid-credentials-error';
import { DatabaseMemory, InMemoryDatabase } from '../../repository/in-memory/in-memory-database';
import { GetProfileService } from './get-profile-service';

let database: DatabaseMemory;
let sut: GetProfileService;

describe('Get Profile Service', () => {

    beforeEach(()=>{
        database = new InMemoryDatabase()
        sut = new GetProfileService(database.management)
    })

    it('should be able to get profile', async () => {
        const password_hash = await hash("123456", 6)
        const register = await database.management.register({
            name: "Yan Gabriel", 
            email: "yan@email.com", 
            password: password_hash
        })
        const { manager }  = await sut.handler({id: register.id})
        expect(manager.id).toEqual(expect.any(String))
    })


})