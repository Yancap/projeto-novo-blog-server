import { beforeEach, describe, expect, it } from 'vitest';
import { DatabaseMemory, InMemoryDatabase } from '../../repository/in-memory/in-memory-database';
import { GetAllArticlesForClientService } from './get-all-articles-for-client-service';


let database: DatabaseMemory;
let sut: GetAllArticlesForClientService

describe('Get all Articles for Client Page Service', () => {

    beforeEach(()=>{
        database = new InMemoryDatabase()
        
        sut = new GetAllArticlesForClientService(
            database.articles
        )
    })

    it('should be able to get an Articles', async () => {
        await database.management.register({
            email: "",
            name: "",
            password: "123",
            id: "author-01"
        })
        await database.categories.create({
            category: "mobile",
            id: "mobile-01"
        })
        await database.articles.create({
            title: "Mundo Mobile",
            subtitle: "",
            image: "",
            text: "Texto sobre o artigo",
            category_id: "mobile-01",
            manager_id: "author-01"
        })
        const article = await sut.handler()
        expect(article[0]).toEqual(expect.any(Object))
    })
    

})