import { beforeEach, describe, expect, it } from 'vitest';
import { DatabaseMemory, InMemoryDatabase } from '../../repository/in-memory/in-memory-database';
import { GetArticleForClientService } from './get-article-for-client-service';


let database: DatabaseMemory;
let sut: GetArticleForClientService

describe('Get a Article for Client Page Service', () => {

    beforeEach(()=>{
        database = new InMemoryDatabase()
        
        sut = new GetArticleForClientService(
            database.articles
        )
    })

    it('should be able to get an Article', async () => {
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
        const articleCreated = await database.articles.create({
            title: "Mundo Mobile",
            subtitle: "",
            image: "",
            text: "Texto sobre o artigo",
            category_id: "mobile-01",
            manager_id: "author-01"
        })
        const article = await sut.handler(articleCreated.slug)
        expect(article).toEqual(expect.any(Object))
    })
    

})