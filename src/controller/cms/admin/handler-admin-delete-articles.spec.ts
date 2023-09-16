import supertest from 'supertest';
import { afterAll, beforeAll, describe, it } from 'vitest';
import { app } from '../../../app';

describe('Admin Delete Articles Handler', () => {

    beforeAll(async () => {
        await app.ready() 
    })

    afterAll(async () => {
        await app.close() 
    })
    
    it.skip('should be able to create an articles', async () => {
            await supertest(app.server).post('/cms/articles')
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