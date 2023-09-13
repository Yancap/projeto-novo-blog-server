import { beforeEach, describe, expect, it } from 'vitest';
import { RegisterManagerService } from './register-manager-service';
import { compare } from 'bcryptjs';
import { EmailAlreadyExistsError } from '../../utils/errors/email-already-exists-error';
import { DatabaseMemory, InMemoryDatabase } from '../../repository/in-memory/in-memory-database';

let database: DatabaseMemory;
let sut: RegisterManagerService

describe('Register Management Service', () => {

    beforeEach(()=> {
        database = new InMemoryDatabase()
        sut = new RegisterManagerService(database.management)
    })

    it('should be able to register a Manager', async () => {
        const manager  = await sut.handler({
            name: "Yan Gabriel",
            email: "yan@email.com",
            password: "123456"
        })
        expect(manager.id).toEqual(expect.any(String))
    })

    it('should not be able to register a Manager with two email', async () => {
        await sut.handler({
            name: "Yan Gabriel",
            email: "yan@email.com",
            password: "123456"
        })
        await expect(() => sut.handler({
            name: "Yan Gabriel",
            email: "yan@email.com",
            password: "123456"
        })).rejects.toBeInstanceOf(EmailAlreadyExistsError)
    })

    it('should be able to encrypt the password', async () => {
        const manager  = await sut.handler({
            name: "Yan Gabriel",
            email: "yan@email.com",
            password: "123456"
        })
        const isHashPassword = await compare("123456", manager.password)
        expect(isHashPassword).toBe(true)
    })
})