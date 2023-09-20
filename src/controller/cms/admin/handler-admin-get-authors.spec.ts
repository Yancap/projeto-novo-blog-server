import supertest from 'supertest';
import { afterAll, assert, beforeAll, beforeEach, describe, expect, it, test } from 'vitest';
import { app } from '../../../app';
import { prisma } from '../../../lib/prisma';

const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJoaWVyYXJjaHkiOiJhZG1pbiIsInN1YiI6IjI4YzgwNTQ3LTM4ZTgtNDY0OS04OWIwLTZlMjJlMTRkYzk1YiIsImlhdCI6MTY5MjkwNTI2Nn0.B_NqQJJRA66SobZm5sw6h_-tcAqBjhPJLemt_BZORTw"
describe('Admin Get Authors Handler', () => {

    beforeAll(async () => {
        
        await prisma.$transaction([
            prisma.management.create({
                data: {
                    email: "manager@",
                    name: "manager",
                    password: "123",
                    id: "manager-01"
                }
            })
        ], {isolationLevel: "Serializable"})
        await app.ready() 
    })

    afterAll(async () => {
        await prisma.$disconnect()
        //Caso o posttest não funcione
        //execSync("prisma migrate reset --skip-seed --force")
        await app.close() 
    })
    
    it('should not be able to get authors without token', async () => {
        await supertest(app.server).get('/cms/admin/get-authors')
        .expect(401)
    })
    it('should not be able to get authors without admin token', async () => {
        await supertest(app.server).get('/cms/admin/get-authors')
        .set('Authorization', 'Bearer ' + "other-token")
        .expect(401)
    })
    it('should be able to get authors', async () => {
        await supertest(app.server).get('/cms/admin/get-authors')
        .set('Authorization', 'Bearer ' + token)
        .expect(200)
        .then( response => {
            expect(response.body.authors[0].id).toEqual(expect.any(String))
        })
    })
})