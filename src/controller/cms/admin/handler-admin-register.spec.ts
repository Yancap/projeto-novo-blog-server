import supertest from 'supertest';
import { afterAll, assert, beforeAll, beforeEach, describe, expect, it, test } from 'vitest';
import { app } from '../../../app';
import { prisma } from '../../../lib/prisma';

const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJoaWVyYXJjaHkiOiJhZG1pbiIsInN1YiI6IjI4YzgwNTQ3LTM4ZTgtNDY0OS04OWIwLTZlMjJlMTRkYzk1YiIsImlhdCI6MTY5MjkwNTI2Nn0.B_NqQJJRA66SobZm5sw6h_-tcAqBjhPJLemt_BZORTw"
describe('Admin Register Manager Handler', () => {

    beforeAll(async () => {
        
        await prisma.$transaction([
            prisma.management.create({
                data: {
                    email: "manager@email.com",
                    name: "manager",
                    password: "123",
                    id: "manager-01"
                }
            })
        ], {isolationLevel: "Serializable"})
        await app.ready() 
    })

    afterAll(async () => {
        //Caso o posttest não funcione
        //execSync("prisma migrate reset --skip-seed --force")
        await app.close() 
    })
    
    it('should not be able to register manager without token', async () => {
        await supertest(app.server).post('/cms/admin/register')
        .expect(401)
    })
    it('should not be able to register manager without admin token', async () => {
        await supertest(app.server).post('/cms/admin/register')
        .set('Authorization', 'Bearer ' + "other-token")
        .expect(401)
    })
    it('should not be able to register manager without params', async () => {
        await supertest(app.server).post('/cms/admin/register')
        .set('Authorization', 'Bearer ' + token)
        .expect(400)
    })
    it('should not be able register manager with existent email', async () => {
        await supertest(app.server).post('/cms/admin/register')
        .set('Authorization', 'Bearer ' + token)
        .send({
            name: "jonh doe",
            email: "manager@email.com",
            password: "123456",
        })
        .expect(400)
    })
    it('should be able register manager', async () => {
        await supertest(app.server).post('/cms/admin/register')
        .set('Authorization', 'Bearer ' + token)
        .send({
            name: "jonh doe",
            email: "jonh@email.com",
            password: "123456",
        })
        .expect(200)
        .then( response => {
            expect(response.body.name).toEqual(expect.any(String))
        })
    })
})