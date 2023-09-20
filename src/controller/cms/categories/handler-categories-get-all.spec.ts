import supertest from 'supertest';
import { afterAll, beforeAll, beforeEach, describe, expect, it, test } from 'vitest';
import { app } from '../../../app';
import { makeRegisterManagerService } from '../../../factory/management/make-register-management-service';
import { prisma } from '../../../lib/prisma';


describe('Get all categories handler', () => {

    beforeAll(async () => {
        prisma.$transaction([
            prisma.categories.create({
                data: {
                    category: "front-end"
                }
            }),
            prisma.categories.create({
                data: {
                    category: "back-end"
                }
            }),
            prisma.categories.create({
                data: {
                    category: "mobile"
                }
            })
        ])
        await app.ready() 
    })

    afterAll(async () => {
        await app.close() 
    })
    
    it('should be able to get all categories', async () => {
        await supertest(app.server).get('/cms/categories')
        .expect(200)
        .then(response => {
            expect(response.body.categories[0].id).toEqual(expect.any(String))
        })
    })

})