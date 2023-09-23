import { hash } from 'bcryptjs';
import supertest from 'supertest';
import { afterAll, beforeAll, beforeEach, describe, expect, it, test } from 'vitest';
import { app } from '../../../app';
import { prisma } from '../../../lib/prisma';


const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJoaWVyYXJjaHkiOiJhZG1pbiIsInN1YiI6IjI4YzgwNTQ3LTM4ZTgtNDY0OS04OWIwLTZlMjJlMTRkYzk1YiIsImlhdCI6MTY5MjkwNTI2Nn0.B_NqQJJRA66SobZm5sw6h_-tcAqBjhPJLemt_BZORTw"
describe('Create Articles Drafts Handler', () => {

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
            })
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
    it('should be able to create an articles draft without article id', async () => {

        let tokenManager: string = ""
        await supertest(app.server).post('/cms/sessions')
        .send({ email: "johndoe@email.com", password: "1234567" })
        .then( response => {
            tokenManager = response.body.token
        })
        
        await supertest(app.server).patch('/cms/articles')
        .set('Authorization', 'Bearer ' + tokenManager)
        .send({ 
            article: {
                title: "Exemplo de titulo de artigo front-end",
                subtitle: "Exemplo de subtitulo para artigo front-end",
                text: "",
                image: "",
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
        .expect(201)
        .then(response => {
            expect(response.body.article.state).toBe("draft")
        })
        
    })

})