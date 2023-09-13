import { beforeEach, describe, expect, it } from 'vitest';
import { DatabaseMemory, InMemoryDatabase } from '../../../repository/in-memory/in-memory-database';
import { AdminGetAllArticlesService } from './admin-get-all-articles-services';

let database: DatabaseMemory;
let sut: AdminGetAllArticlesService;

describe('Admin Get All Articles Service', () => {

    beforeEach(()=> {
        database = new InMemoryDatabase()
        sut = new AdminGetAllArticlesService(database.articles)
    })

    it('should be able to get all articles', async () => {
        await database.categories.create({
            category: "front-end",
            id: "category-01"
        })
        await database.articles.create({
            title: "Mundo Mobile",
            image: "",
            subtitle: "",
            text: "Texto sobre o artigo",
            category_id: "category-01",
            manager_id: "manager-01"
        })
        const articles = await sut.handler()
        expect(articles).toEqual(expect.any(Array))
    })
    
    
})