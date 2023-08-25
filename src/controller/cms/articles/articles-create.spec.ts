import supertest from 'supertest';
import { afterAll, beforeAll, beforeEach, describe, expect, it, test } from 'vitest';
import { app } from '../../../app';


const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJoaWVyYXJjaHkiOiJhZG1pbiIsInN1YiI6IjI4YzgwNTQ3LTM4ZTgtNDY0OS04OWIwLTZlMjJlMTRkYzk1YiIsImlhdCI6MTY5MjkwNTI2Nn0.B_NqQJJRA66SobZm5sw6h_-tcAqBjhPJLemt_BZORTw"
describe('Create Articles Controller', () => {

    beforeAll(async () => {
        await app.ready() 
    })

    afterAll(async () => {
        await app.close() 
    })
    
    it.skip('should be able to create an articles', async () => {
            await supertest(app.server).post('/cms/articles')
            .set('Authorization', 'Bearer ' + token)
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
            }).expect(200)
    })
})