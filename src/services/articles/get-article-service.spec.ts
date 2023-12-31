import { beforeEach, describe, expect, it } from 'vitest';
import { GetArticleService } from './get-article-service';
import { DatabaseMemory, InMemoryDatabase } from '../../repository/in-memory/in-memory-database';


let database: DatabaseMemory;
let sut: GetArticleService

describe('Get a Article Service', () => {

    beforeEach(()=>{
        database = new InMemoryDatabase()
        
        sut = new GetArticleService(
            database.articles
        )
    })

    it('should be able to get an Articles', async () => {
        const articleCreated = await database.articles.create({
            title: "Mundo Mobile",
            subtitle: "",
            image: "",
            text: "Texto sobre o artigo",
            category_id: "mobile-01",
            manager_id: "author-01"
        })
        const article = await sut.handler({article_id: articleCreated.id})
        expect(article).toEqual(expect.any(Object))
    })
    

})