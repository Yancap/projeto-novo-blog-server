import { hash } from 'bcryptjs';
import supertest from 'supertest';
import { afterAll, beforeAll, beforeEach, describe, expect, it, test } from 'vitest';
import { app } from '../../../app';
import { makeRegisterManagerService } from '../../../factory/management/make-register-management-service';
import { prisma } from '../../../lib/prisma';

describe('Controller Change Avatar ', () => {

    beforeAll(async () => {
      const password_hash = await hash("1234567", 6)
      
      await prisma.management.create({
        data: {
          email: "johnD@email.com",
          name: "john",
          password: password_hash
        }
      })
      await app.ready() 
    })

    afterAll(async () => {
        await app.close() 
    })
    
    it('should not be able to login without token', async () => {
        await supertest(app.server).put('/cms/manager/avatar')
        .send({ avatar: "image.png"})
        .expect(401)
    })
    it('should not be able to change avatar without avatar params', async () => {
      let tokenManager: string = ""
      await supertest(app.server).post('/cms/sessions')
      .send({ email: "johnD@email.com", password: "1234567" })
      .then( response => {
        tokenManager = response.body.token
      })
      
      await supertest(app.server).put('/cms/manager/avatar')
      .set('Authorization', 'Bearer ' + tokenManager)
      .send({ })
      .expect(400)
    })
    it('should be able to change avatar', async () => {
      let tokenManager: string = ""
      await supertest(app.server).post('/cms/sessions')
      .send({ email: "johnD@email.com", password: "1234567" })
      .then( response => {
        tokenManager = response.body.token
      })

      
      await supertest(app.server).put('/cms/manager/avatar')
      .set('Authorization', 'Bearer ' + tokenManager)
      .send({ avatar: "image.png"})
      .expect(200)
    })
})