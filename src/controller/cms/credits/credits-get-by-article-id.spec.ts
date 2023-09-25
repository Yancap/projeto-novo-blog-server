import supertest from 'supertest';
import { afterAll, beforeAll, beforeEach, describe, expect, it, test } from 'vitest';
import { app } from '../../../app';
import { prisma } from '../../../lib/prisma';
import { hash } from 'bcryptjs';

describe('Get Credits by Article Id Handler', () => {

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
            prisma.credits.create({
                data: {
                    link: 'www.site.com',
                    name: 'credit',
                    article_id: 'article-id-01'
                }
            })
        ], {isolationLevel: "Serializable"})
        
        await app.ready() 
    })

    afterAll(async () => {
        await app.close() 
    })
    it('should be able to get credits with article id', async () => {
        await supertest(app.server).get(`/cms/credits/article-id-01`)
        .expect(200)
        .then(response => {
            expect(response.body.credits[0].link).toBe("www.site.com")
        })
        
    })
})