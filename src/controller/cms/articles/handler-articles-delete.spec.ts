import { hash } from 'bcryptjs';
import supertest from 'supertest';
import { afterAll, beforeAll, beforeEach, describe, expect, it, test } from 'vitest';
import { app } from '../../../app';
import { prisma } from '../../../lib/prisma';


const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJoaWVyYXJjaHkiOiJhZG1pbiIsInN1YiI6IjI4YzgwNTQ3LTM4ZTgtNDY0OS04OWIwLTZlMjJlMTRkYzk1YiIsImlhdCI6MTY5MjkwNTI2Nn0.B_NqQJJRA66SobZm5sw6h_-tcAqBjhPJLemt_BZORTw"
describe('Delete Articles Handler', () => {

    beforeAll(async () => {
        const password_hash = await hash("1234567", 6)
        await prisma.$transaction([
            prisma.management.create({
                data: {
                    name: "john doe",
                    password: password_hash,
                    email: "johndoe@email.com",
                    id: "author-john-01"
                }
            }),
            prisma.categories.create({ data: {
                category: "front-end",
                id: "front-end-01"
            }}),
            prisma.articles.create({data: {
                id: "article-id-01",
                title: "teste",
                subtitle: "teste",
                image: 'png',
                text: "text",
                state: "draft",
                manager_id: "author-john-01",
                category_id: "front-end-01"
            }})
        ], {isolationLevel: "Serializable"})
        await app.ready() 
    })

    afterAll(async () => {
        await app.close() 
    })
    
    it('should not be able to delete an article without token', async () => {
        await supertest(app.server).delete(`/cms/articles/article-id-01`)
        .expect(401)
    })
    it('should not be able to delete an article without a valid token', async () => {
        await supertest(app.server).delete(`/cms/articles/article-id-01`)
        .set('Authorization', 'Bearer ' + "invalid-token")
        .expect(401)
    })
    it('should not be able to delete an article without id', async () => {

        let tokenManager: string = ""

        await supertest(app.server).post('/cms/sessions')
        .send({ email: "johndoe@email.com", password: "1234567" })
        .expect(200)
        .then( response => {
            tokenManager = response.body.token
        })
        

        await supertest(app.server).delete(`/cms/articles/`)
        .set('Authorization', 'Bearer ' + tokenManager)
        .expect(404)
        .then(response => {
            expect(response.body.error).toBe("ForbiddenOperationError")
        })
    })
    it('should be able to delete an article', async () => {

        let tokenManager: string = ""
        await supertest(app.server).post('/cms/sessions')
        .send({ email: "johndoe@email.com", password: "1234567" })
        .expect(200)
        .then( response => {
            tokenManager = response.body.token
        })
        
        await supertest(app.server).delete(`/cms/articles/article-id-01`)
        .set('Authorization', 'Bearer ' + tokenManager)
        .expect(200)
        .then(response => {
            expect(response.body.message).toBe("success")
        })

    })
})