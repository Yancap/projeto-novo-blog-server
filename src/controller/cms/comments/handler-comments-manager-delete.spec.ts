import supertest from 'supertest';
import { afterAll, beforeAll, beforeEach, describe, expect, it, test } from 'vitest';
import { app } from '../../../app';
import { prisma } from '../../../lib/prisma';
import { hash } from 'bcryptjs';

describe('Manager Delete Comments Handler', () => {

    beforeAll(async () => {
        const password_hash = await hash("1234567", 6)
        await prisma.$transaction([
            prisma.management.create({
                data: {
                    name: "john doe",
                    password: password_hash,
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
                    email: "user@email.com",
                    name: "User",
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
        await app.close() 
    })
    
    it('should not be able to delete comments without manager token', async () => {
        
        await supertest(app.server).delete(`/cms/comments/manager-delete`)
        .set('Authorization', 'Bearer ' + '')
        .send({ })
        .expect(401)
        .then(resp => {
            expect(resp.body.error).toBe('InvalidOrNotExistentTokenError')
        })
    })
    it('should not be able to delete comments without mandatory params', async () => {
        let tokenManager: string = ""
        await supertest(app.server).post('/cms/sessions')
        .send({ email: "john@email.com", password: "1234567" })
        .then( response => {
            tokenManager = response.body.token
        })

        await supertest(app.server).delete(`/cms/comments/manager-delete`)
        .set('Authorization', 'Bearer ' + tokenManager)
        .send({ })
        .expect(400)
        .then(resp => {
            expect(resp.body.error).toBe('ValidationRequestError')
        })
    })
    it('should not be able to deletecomments with invalid ids params', async () => {
        let tokenManager: string = ""
        await supertest(app.server).post('/cms/sessions')
        .send({ email: "john@email.com", password: "1234567" })
        .then( response => {
            tokenManager = response.body.token
        })

        await supertest(app.server).delete(`/cms/comments/manager-delete`)
        .set('Authorization', 'Bearer ' + tokenManager)
        .send({
            article_id: "invalid-id-01",
            comment_id: "invalid-id-01"
         })
        .expect(404)
        .then(resp => {
            expect(resp.body.error).toBe('ResourceNotFoundError')
        })
    })
    it('should be able to delete comments', async () => {
        let tokenManager: string = ""
        await supertest(app.server).post('/cms/sessions')
        .send({ email: "john@email.com", password: "1234567" })
        .then( response => {
            tokenManager = response.body.token
        })

        await supertest(app.server).delete(`/cms/comments/manager-delete`)
        .set('Authorization', 'Bearer ' + tokenManager)
        .send({
            article_id: "article-id-01",
            comment_id: "comment-id-01"
        })
        .expect(200)
        .then(response => {
            expect(response.body.message).toBe("success")
        })
    })
})