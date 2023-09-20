import supertest from 'supertest';
import { afterAll, beforeAll, beforeEach, describe, expect, it, test } from 'vitest';
import { app } from '../../../app';
import { prisma } from '../../../lib/prisma';

const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJoaWVyYXJjaHkiOiJhZG1pbiIsInN1YiI6IjI4YzgwNTQ3LTM4ZTgtNDY0OS04OWIwLTZlMjJlMTRkYzk1YiIsImlhdCI6MTY5MjkwNTI2Nn0.B_NqQJJRA66SobZm5sw6h_-tcAqBjhPJLemt_BZORTw"
describe('Admin Delete Authors Handler', () => {

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
    
    it('should not be able to delete an author that not exist', async () => {
        await supertest(app.server).delete('/cms/admin/delete-authors')
        .set('Authorization', 'Bearer ' + token)
        .send({
            author_id: "not-exist"
        }).expect(404)
    })
    it('should not be able to delete an author without token', async () => {
        await supertest(app.server).delete('/cms/admin/delete-authors')
        .send({
            author_id: "manager-01"
        }).expect(401)
    })
    it('should not be able to delete an author without admin token', async () => {
        await supertest(app.server).delete('/cms/admin/delete-authors')
        .set('Authorization', 'Bearer ' + "other-token")
        .send({
            author_id: "manager-01"
        }).expect(401)
    })
    it('should not be able to delete an author without manager id', async () => {
        await supertest(app.server).delete('/cms/admin/delete-authors')
        .set('Authorization', 'Bearer ' + token)
        .send().expect(400)
    })
    it('should be able to admin delete an author', async () => {
        await supertest(app.server).delete('/cms/admin/delete-authors')
        .set('Authorization', 'Bearer ' + token)
        .send({
            author_id: "manager-01"
        }).expect(200)
    })
})