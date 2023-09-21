import supertest from 'supertest';
import { afterAll, beforeAll, beforeEach, describe, expect, it, test } from 'vitest';
import { app } from '../../../app';
import { prisma } from '../../../lib/prisma';

const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJoaWVyYXJjaHkiOiJhZG1pbiIsInN1YiI6IjI4YzgwNTQ3LTM4ZTgtNDY0OS04OWIwLTZlMjJlMTRkYzk1YiIsImlhdCI6MTY5MjkwNTI2Nn0.B_NqQJJRA66SobZm5sw6h_-tcAqBjhPJLemt_BZORTw"
describe('Active Articles Controller', () => {

    beforeAll(async () => {
        await app.ready() 
    })

    afterAll(async () => {
        prisma.$disconnect()
        await app.close() 
    })

    it('should not be able to active an article without token', async () => {
        await supertest(app.server).patch(`/cms/articles/active/article-id-01`)
        .send({ 
            article: {
                title: "Exemplo de titulo de artigo front-end",
                subtitle: "Exemplo de subtitulo para artigo front-end",
                text: "<p>Paragrafos do texto</p>",
                image: "imagem.png",
                state: "active",
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
    it('should not be able to active an article without a valid token', async () => {
        await supertest(app.server).patch(`/cms/articles/active/article-id-01`)
        .set('Authorization', 'Bearer ' + "invalid-token")
        .send({ 
            article: {
                title: "Exemplo de titulo de artigo front-end",
                subtitle: "Exemplo de subtitulo para artigo front-end",
                text: "<p>Paragrafos do texto</p>",
                image: "imagem.png",
                state: "active",
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
    it('should not be able to active an article without id', async () => {

        await supertest(app.server).post('/cms/admin/register')
        .set('Authorization', 'Bearer ' + token)
        .send({
            name: "jonh doe",
            email: "john123@email.com",
            password: "1234567",
        })

        let tokenManager: string = ""
        await supertest(app.server).post('/cms/sessions')
        .send({ email: "john123@email.com", password: "1234567" })
        .then( response => {
            tokenManager = response.body.token
        })
        
        await supertest(app.server).post('/cms/articles')
        .set('Authorization', 'Bearer ' + tokenManager)
        .send({ 
            article: {
                title: "Exemplo de titulo de artigo front-end",
                subtitle: "Exemplo de subtitulo para artigo front-end",
                text: "<p>Paragrafos do texto</p>",
                image: "imagem.png",
                state: "draft",
                category: "front-end",
            },
            tags: [ 
                {name: "frontend"}, 
                {name: "react"} 
            ],
            credits: [ 
                {name: "google", link: "www.google.com"}, 
                {name: "web", link: "www.web.com"} 
            ],
        })

        await supertest(app.server).patch(`/cms/articles/active/`)
        .set('Authorization', 'Bearer ' + tokenManager)
        .expect(200)
    })
    it.skip('should be able to active an article', async () => {
        
        await supertest(app.server).post('/cms/admin/register')
        .set('Authorization', 'Bearer ' + token)
        .send({
            name: "jonh doe",
            email: "john@email.com",
            password: "1234567",
        })

        let tokenManager: string = ""
        await supertest(app.server).post('/cms/sessions')
        .send({ email: "john@email.com", password: "1234567" })
        .then( response => {
            tokenManager = response.body.token
        })
            
        await supertest(app.server).post('/cms/articles')
        .set('Authorization', 'Bearer ' + tokenManager)
        .send({ 
            article: {
                title: "Exemplo de titulo de artigo front-end",
                subtitle: "Exemplo de subtitulo para artigo front-end",
                text: "<p>Paragrafos do texto</p>",
                image: "imagem.png",
                state: "draft",
                category: "front-end",
                id: 'article-id-01'
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

        await supertest(app.server).patch(`/cms/articles/active/article-id-01`)
        .set('Authorization', 'Bearer ' + tokenManager)
        .expect(200)
    })
})