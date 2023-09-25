import supertest from 'supertest';
import { afterAll, beforeAll, beforeEach, describe, expect, it, test } from 'vitest';
import { app } from '../../../app';
import { prisma } from '../../../lib/prisma';

const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJoaWVyYXJjaHkiOiJhZG1pbiIsInN1YiI6IjI4YzgwNTQ3LTM4ZTgtNDY0OS04OWIwLTZlMjJlMTRkYzk1YiIsImlhdCI6MTY5MjkwNTI2Nn0.B_NqQJJRA66SobZm5sw6h_-tcAqBjhPJLemt_BZORTw"
describe('Admin Handler delete articles', () => {

    beforeAll(async () => {
        
        await prisma.$transaction([
            prisma.management.create({
                data: {
                    email: "fulano@email",
                    name: "fulano",
                    password: "123",
                    id: "fulano-02"
                }
            }),
            prisma.categories.create({ data: {
                category: "front-end",
                id: "front-end-2"
            }}),
            prisma.articles.create({data: {
                id: "article_id-02",
                title: "teste",
                subtitle: "teste",
                image: 'png',
                text: "text",
                manager_id: "fulano-02",
                category_id: "front-end-2"
            }})
        ], {isolationLevel: "Serializable"})
        await app.ready() 
    })

    afterAll(async () => {
        await app.close() 
    })
    
    it('should not be able to delete an articles that not exist', async () => {
        await supertest(app.server).delete('/cms/admin/delete-articles')
        .set('Authorization', 'Bearer ' + token)
        .send({
            article_id: "not-exist"
        }).expect(404)
    })
    it('should not be able to delete an articles without token', async () => {
        await supertest(app.server).delete('/cms/admin/delete-articles')
        .send({
            article_id: "article_id"
        }).expect(401)
    })
    it('should not be able to delete an articles without admin token', async () => {
        await supertest(app.server).delete('/cms/admin/delete-articles')
        .set('Authorization', 'Bearer ' + "other-token")
        .send({
            article_id: "article_id"
        }).expect(401)
    })
    it('should not be able to delete an articles without article id', async () => {
        await supertest(app.server).delete('/cms/admin/delete-articles')
        .set('Authorization', 'Bearer ' + token)
        .send().expect(400)
    })
    it('should be able to admin delete an articles', async () => {
        await supertest(app.server).delete('/cms/admin/delete-articles')
        .set('Authorization', 'Bearer ' + token)
        .send({
            article_id: "article_id-02"
        }).expect(200)
    })
})