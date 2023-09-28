import supertest from 'supertest';
import { afterAll, assert, beforeAll, beforeEach, describe, expect, it, test } from 'vitest';
import { app } from '../../../app';
import { prisma } from '../../../lib/prisma';

describe('Get Users by Email Handler', () => {

    beforeAll(async () => {
        await app.ready() 
    })

    afterAll(async () => {
        //Caso o posttest não funcione
        //execSync("prisma migrate reset --skip-seed --force")
        await app.close() 
    })
    
    it('should not be able to get users without params', async () => {
        await supertest(app.server).get('/client/users/')
        .expect(200)
        .then(resp => {
            expect(resp.body).toBe(null)
        })
    })

    it('should be able to get users', async () => {
        await prisma.users.create({
            data: {
                name: "john",
                email: "john@email.com",
                avatar: "john",
            }
        })
        await supertest(app.server).get('/client/users/john@email.com')
        .expect(200)
        .then(resp => {
            expect(resp.body.user.email).toBe("john@email.com")
        })
    })



})