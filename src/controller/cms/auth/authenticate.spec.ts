import supertest from 'supertest';
import { afterAll, beforeAll, beforeEach, describe, expect, it, test } from 'vitest';
import { app } from '../../../app';
import { makeRegisterManagerService } from '../../../factory/management/make-register-management-service';
import { prisma } from '../../../lib/prisma';



describe('Controller Authenticate ', () => {

    beforeAll(async () => {
        const register = makeRegisterManagerService();
        await register.handler({
            email: "john@email.com",
            name: "john",
            password: "1234567"
        })
        await app.ready() 
    })

    afterAll(async () => {
        await app.close() 
    })
    
    it('should not be able to login without params', async () => {
        await supertest(app.server).post('/cms/sessions')
        .expect(400)
    })
    it('should not be able to login with wrong email', async () => {
        await supertest(app.server).post('/cms/sessions')
        .send({ email: "errado@email.com", password: "1234567" })
        .expect(401)
    })
    it('should not be able to login with wrong password', async () => {
        await supertest(app.server).post('/cms/sessions')
        .send({ email: "john@email.com", password: "senha-errada" })
        .expect(401)
    })
    it('should be able to login and return token', async () => {
        await supertest(app.server).post('/cms/sessions')
        .send({ email: "john@email.com", password: "1234567" })
        .expect(200)
        .then( response => {
            expect(response.body.token).toEqual(expect.any(String))
        })
    })
})