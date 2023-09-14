import { beforeEach, describe, expect, it } from 'vitest';
import { DatabaseMemory, InMemoryDatabase } from '../../repository/in-memory/in-memory-database';
import { GetArticlesByCategoryService } from './get-articles-by-category';


let database: DatabaseMemory;
let sut: GetArticlesByCategoryService

describe('Get a Article By Category Service', () => {

    beforeEach(()=>{
        database = new InMemoryDatabase()
        
        sut = new GetArticlesByCategoryService(
            database.articles
        )
    })

    it('should be able to get an Articles', async () => {
        const category = await database.categories.create({
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
        const article = await sut.handler({category: category.category})
        expect(article).toEqual(expect.any(Object))
    })
    

})