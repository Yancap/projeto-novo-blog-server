import supertest from 'supertest';
import { afterAll, assert, beforeAll, beforeEach, describe, expect, it, test } from 'vitest';
import { app } from '../../../app';
import { prisma } from '../../../lib/prisma';

describe('Users Register Handler', () => {

    beforeAll(async () => {

        await app.ready() 
    })

    afterAll(async () => {
        //Caso o posttest não funcione
        //execSync("prisma migrate reset --skip-seed --force")
        await app.close() 
    })
    
    it('should not be able to register users without params', async () => {
        await supertest(app.server).post('/client/users/')
        .expect(400)
    })

    it('should be able to register users', async () => {
        
        await supertest(app.server).post('/client/users/')
        .send({
            name: "yan",
            email: "yan@email.com",
            avatar: "yan",
        })
        .expect(200)
    })
    it('should be able to login users', async () => {
        await prisma.users.create({
            data: {
                name: "john",
                email: "john@email.com",
                avatar: "john",
            }
        })
        await supertest(app.server).post('/client/users/')
        .send({
            name: "john",
            email: "john@email.com",
            avatar: "john",
        })
        .expect(200)
    })

})