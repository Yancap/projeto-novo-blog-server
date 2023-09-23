import { hash } from 'bcryptjs';
import supertest from 'supertest';
import { afterAll, beforeAll, beforeEach, describe, expect, it, test } from 'vitest';
import { app } from '../../../app';
import { prisma } from '../../../lib/prisma';

describe('Get Article by Manager Id Handler', () => {

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
                slug: "test-slug-1",
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
        prisma.$disconnect()
        await app.close() 
    })

    it('should not be able to get article without token', async () => {
        await supertest(app.server).get('/cms/articles/')
        .expect(401)
        .then(resp => {
            expect(resp.body.error).toBe("InvalidOrNotExistentTokenError")
        })
    })
    it('should not be able to get article with invalid token', async () => {
        await supertest(app.server).get('/cms/articles/')
        .set('Authorization', 'Bearer ' + "invalid-token")
        .expect(401)
        .then(resp =>{
            expect(resp.body.error).toBe("InvalidOrNotExistentTokenError")
        })
    })
    it('should be able to get article with manager id', async () => {
        let tokenManager: string = ""
        await supertest(app.server).post('/cms/sessions')
        .send({ email: "johndoe@email.com", password: "1234567" })
        .expect(200)
        .then( response => {
            tokenManager = response.body.token
        })

        await supertest(app.server).get('/cms/articles/')
        .set('Authorization', 'Bearer ' + tokenManager)
        .expect(200)
        .then(resp =>{
            expect(resp.body.articles).toEqual(expect.any(Array))
        })
    })
})