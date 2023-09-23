import { hash } from 'bcryptjs';
import supertest from 'supertest';
import { afterAll, beforeAll, beforeEach, describe, expect, it, test } from 'vitest';
import { app } from '../../../app';
import { prisma } from '../../../lib/prisma';

describe('Get Article by Slug or Id Handler', () => {

    beforeAll(async () => {
        await prisma.$transaction([
            prisma.management.create({
                data: {
                    name: "john doe",
                    password: '12345567',
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

    it('should not be able to get article without id or slug', async () => {
        await supertest(app.server).get('/cms/articles/get')
        .expect(400)
        .then(resp => {
            expect(resp.body.error).toBe("ValidationRequestError")
        })
    })
    it('should not be able to get article with id', async () => {
        await supertest(app.server).get('/cms/articles/get?id=article-id-01')
        .expect(200)
        .then(resp =>{
            expect(resp.body.article.id).toBe('article-id-01')
        })
    })
    it('should not be able to get article with slug', async () => {
        await supertest(app.server).get('/cms/articles/get?slug=test-slug-1')
        .expect(200)
        .then(resp =>{
            expect(resp.body.article.id).toBe('article-id-01')
        })
    })
})