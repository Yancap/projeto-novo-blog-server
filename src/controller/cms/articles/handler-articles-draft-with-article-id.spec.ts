import { hash } from 'bcryptjs';
import supertest from 'supertest';
import { afterAll, beforeAll, beforeEach, describe, expect, it, test } from 'vitest';
import { app } from '../../../app';
import { prisma } from '../../../lib/prisma';

describe('Create Articles Drafts With Article Id Handler', () => {

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
                state: "active",
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

    it('should not be able to create an article draft without token', async () => {
        await supertest(app.server).patch('/cms/articles')
        .send({ 
            article: {
                title: "Exemplo de titulo de artigo front-end",
                subtitle: "Exemplo de subtitulo para artigo front-end",
                text: "<p>Paragrafos do texto</p>",
                image: "imagem.png",
                state: "draft",
                category: "front-end",
            },
            tags:[ 
                {name: "frontend"}, 
                {name: "react"} 
            ],
            credits:[ 
                {name: "google", link: "www.google.com"}, 
                {name: "web", link: "www.web.com"} 
            ],
        }).expect(401)
    })

    it('should not be able to create an article draft without a valid token', async () => {
        await supertest(app.server).patch('/cms/articles')
        .set('Authorization', 'Bearer ' + "invalid-token")
        .send({ 
            article: {
                title: "Exemplo de titulo de artigo front-end",
                subtitle: "Exemplo de subtitulo para artigo front-end",
                text: "<p>Paragrafos do texto</p>",
                image: "imagem.png",
                state: "draft",
                category: "front-end",
            },
            tags:[ 
                {name: "frontend"}, 
                {name: "react"} 
            ],
            credits:[ 
                {name: "google", link: "www.google.com"}, 
                {name: "web", link: "www.web.com"} 
            ],
        }).expect(401)
    })
    it('should not be able to create an articles draft withou mandatory params', async () => {

        let tokenManager: string = ""
        await supertest(app.server).post('/cms/sessions')
        .send({ email: "johndoe@email.com", password: "1234567" })
        .then( response => {
            tokenManager = response.body.token
        })
        
        await supertest(app.server).patch('/cms/articles')
        .set('Authorization', 'Bearer ' + tokenManager)
        .send({
        })
        .expect(400)
        .then(response => {
            expect(response.body.error).toBe("ValidationRequestError")
        })
        
    })
    it('should be able to create an articles draft with invalid article id', async () => {

        let tokenManager: string = ""
        await supertest(app.server).post('/cms/sessions')
        .send({ email: "johndoe@email.com", password: "1234567" })
        .then( response => {
            tokenManager = response.body.token
        })
        
        await supertest(app.server).patch('/cms/articles/invalid-id')
        .set('Authorization', 'Bearer ' + tokenManager)
        .send({ 
            article: {
                state: "draft",
                category: "front-end",
            },
            tags:[ 
                {name: "frontend"}, 
                {name: "react"} 
            ],
            credits:[ 
                {name: "google", link: "www.google.com"}, 
                {name: "web", link: "www.web.com"} 
            ],
        })
        .expect(404)
        
    })
    it('should be able to create an articles draft with article id', async () => {

        let tokenManager: string = ""
        await supertest(app.server).post('/cms/sessions')
        .send({ email: "johndoe@email.com", password: "1234567" })
        .then( response => {
            tokenManager = response.body.token
        })
        
        await supertest(app.server).patch('/cms/articles/article-id-01')
        .set('Authorization', 'Bearer ' + tokenManager)
        .send({ 
            article: {
                state: "draft",
                category: "front-end",
            },
            tags:[ 
                {name: "frontend"}, 
                {name: "react"} 
            ],
            credits:[ 
                {name: "google", link: "www.google.com"}, 
                {name: "web", link: "www.web.com"} 
            ],
        })
        .expect(200)
        .then(response => {
            expect(response.body.article.state).toBe("draft")
        })
        
    })

})