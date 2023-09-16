import supertest from 'supertest';
import { afterAll, beforeAll, beforeEach, describe, expect, it, test } from 'vitest';
import { app } from '../../../app';


const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJoaWVyYXJjaHkiOiJhZG1pbiIsInN1YiI6IjI4YzgwNTQ3LTM4ZTgtNDY0OS04OWIwLTZlMjJlMTRkYzk1YiIsImlhdCI6MTY5MjkwNTI2Nn0.B_NqQJJRA66SobZm5sw6h_-tcAqBjhPJLemt_BZORTw"
describe.skip('Delete Articles Controller', () => {

    beforeAll(async () => {
        await app.ready() 
    })

    afterAll(async () => {
        await app.close() 
    })
    
    it('should be able to delete an articles', async () => {
            await supertest(app.server).delete('/cms/articles')
            .set('Authorization', 'Bearer ' + token)
            .send({ 
                id: "95ef1bcb-0ad7-4a06-81b4-f1d532601c46"
            }).expect(200)
    })
})