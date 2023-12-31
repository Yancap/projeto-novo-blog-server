import supertest from 'supertest';
import { afterAll, assert, beforeAll, beforeEach, describe, expect, it, test } from 'vitest';
import { app } from '../../../app';
import { prisma } from '../../../lib/prisma';

describe('Get Article for Client Handler', () => {

    beforeAll(async () => {
        await prisma.$transaction([
            prisma.management.create({
                data: {
                    name: "john doe",
                    password: "1234567",
                    email: "john@email.com",
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
                state: "active",
                manager_id: "author-john-01",
                category_id: "front-end-01"
            }}),
        ], {isolationLevel: "Serializable"})
        await app.ready() 
    })

    afterAll(async () => {
        //Caso o posttest não funcione
        //execSync("prisma migrate reset --skip-seed --force")
        await app.close() 
    })
    it('should not be able to get a article without slug', async () => {
        await supertest(app.server).get('/client/articles/by/')
        .expect(200)
        .then(resp => {
            
            expect(resp.body.articles).toBe(null)
        })
    })
    it('should be able to get a article', async () => {
        await supertest(app.server).get('/client/articles/by/test-slug-1')
        .expect(200)
        .then(resp => {
            expect(resp.body.articles.slug).toBe('test-slug-1')
        })
    })
    
})