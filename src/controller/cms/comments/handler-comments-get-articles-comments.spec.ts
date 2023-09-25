import supertest from 'supertest';
import { afterAll, beforeAll, beforeEach, describe, expect, it, test } from 'vitest';
import { app } from '../../../app';
import { prisma } from '../../../lib/prisma';
import { hash } from 'bcryptjs';

const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJoaWVyYXJjaHkiOiJhZG1pbiIsInN1YiI6IjI4YzgwNTQ3LTM4ZTgtNDY0OS04OWIwLTZlMjJlMTRkYzk1YiIsImlhdCI6MTY5MjkwNTI2Nn0.B_NqQJJRA66SobZm5sw6h_-tcAqBjhPJLemt_BZORTw"
describe('Get Articles Comments Handler', () => {

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
            }}),
            prisma.users.create({
                data: {
                    avatar: "",
                    email: "user@email.com",
                    name: "User",
                    id: "user-id-01"
                }
            }),
            prisma.comments.create({
                data: {
                    text: "comments",
                    article_id: "article-id-01",
                    user_id: "user-id-01"
                }
            })
        ], {isolationLevel: "Serializable"})
        
        await app.ready() 
    })

    afterAll(async () => {
        await app.close() 
    })
    it('should not be able to get comments without article id or slug', async () => {
        await supertest(app.server).get(`/cms/comments/from-articles`)
        .expect(400)
        .then(response => {
            expect(response.body.error).toBe("ValidationRequestError")
        })
        
    })
    it('should be able to get comments with article id', async () => {
        await supertest(app.server).get(`/cms/comments/from-articles?article_id=article-id-01`)
        .expect(200)
        .then(response => {
            expect(response.body.comments[0].text).toEqual(expect.any(String))
        })
    })
    it('should be able to get comments with slug', async () => {
        await supertest(app.server).get(`/cms/comments/from-articles?slug=test-slug-1`)
        .expect(200)
        .then(response => {
            expect(response.body.comments[0].text).toEqual(expect.any(String))
        })
    })

})