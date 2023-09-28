import supertest from 'supertest';
import { afterAll, assert, beforeAll, beforeEach, describe, expect, it, test } from 'vitest';
import { app } from '../../../app';
import { prisma } from '../../../lib/prisma';

describe('Delete Comments By Users Handler', () => {

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
                state: "draft",
                manager_id: "author-john-01",
                category_id: "front-end-01"
            }}),
            prisma.users.create({
                data: {
                    avatar: "",
                    name: "john",
                    email: "john@email.com",
                    id: "user-id-01"
                }
            }),
            prisma.comments.create({
                data: {
                    text: "comments",
                    article_id: "article-id-01",
                    user_id: "user-id-01",
                    id: "comment-id-01"
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

    it('should not be able to delete comments without user token', async () => {
        await supertest(app.server).delete('/client/comments/comment-id-01')
        .set('Authorization', 'Bearer ' + '')
        .send({
            slug: "test-slug-1",
            text: "texto"
        })
        .expect(401)
        
    })

    it('should not be able to delete comments without mandatory params', async () => {
        let tokenManager: string = ""
        await supertest(app.server).post('/client/users/')
        .send({
            name: "john",
            email: "john@email.com",
        })
        .then( response => {
            tokenManager = response.body.user.token
        })
        
        await supertest(app.server).delete('/client/comments/')
        .set('Authorization', 'Bearer ' + tokenManager)
        .expect(404)
    })


    it('should be able to delete comment', async () => {
        let tokenManager: string = ""
        await supertest(app.server).post('/client/users/')
        .send({
            name: "john",
            email: "john@email.com",
        })
        .then( response => {
            tokenManager = response.body.user.token
        })

        await supertest(app.server).delete('/client/comments/comment-id-01')
        .set('Authorization', 'Bearer ' + tokenManager)
        .expect(200)
    })



})