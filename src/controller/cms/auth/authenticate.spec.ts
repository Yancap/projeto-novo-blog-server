import supertest from 'supertest';
import { afterAll, beforeAll, beforeEach, describe, expect, it, test } from 'vitest';
import { app } from '../../../app';



describe('Controller Authenticate ', () => {

    beforeAll(async () => {
        await app.ready() //Inicializa o 'app' para se realizado os testes
    })

    afterAll(async () => {
        await app.close() //Fecha o 'app' após a realização dos testes
    })
    
    it('should be able to login', async () => {
        await supertest(app.server).post('/cms/sessions')
        .send({ email: "yan@email.com", password: "1234567" })
        .expect(200)
    })
    it('should not be able to login with wrong email', async () => {
        await supertest(app.server).post('/cms/sessions')
        .send({ email: "errado@email.com", password: "1234567" })
        .expect(400)
    })
    it('should not be able to login with wrong password', async () => {
        await supertest(app.server).post('/cms/sessions')
        .send({ email: "errado@email.com", password: "1234567" })
        .expect(400)
    })
})