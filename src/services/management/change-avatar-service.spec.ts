import { beforeEach, describe, expect, it } from 'vitest';
import { hash } from 'bcryptjs';
import { DatabaseMemory, InMemoryDatabase } from '../../repository/in-memory/in-memory-database';
import { ChangeAvatarService } from './change-avatar-service';

let database: DatabaseMemory;
let sut: ChangeAvatarService;

describe('Change Avatar Service', () => {

    beforeEach(()=>{
        database = new InMemoryDatabase()
        sut = new ChangeAvatarService(database.management)
    })

    it('should be able to change avatar', async () => {
        const password_hash = await hash("123456", 6)
        const register = await database.management.register({
            name: "Yan Gabriel", 
            email: "yan@email.com", 
            password: password_hash
        })
        const { isChanged }  = await sut.handler({id: register.id, avatar: "image.jpg"})
        expect(isChanged).toBe(true)
    })


})