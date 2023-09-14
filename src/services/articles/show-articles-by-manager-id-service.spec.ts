import { InMemoryArticles } from '../../repository/in-memory/in-memory-articles';
import { ArticlesRepository } from '../../repository/interfaces/interface-articles-repository';
import { beforeEach, describe, expect, it } from 'vitest';
import { ShowArticlesByManagerIdService } from './show-articles-by-manager-id-service';
import { DatabaseMemory, InMemoryDatabase } from '../../repository/in-memory/in-memory-database';


let database: DatabaseMemory;
let sut: ShowArticlesByManagerIdService

describe('Show Articles By Manager Id Service', () => {

    beforeEach(()=>{
        database = new InMemoryDatabase()
        database.articles.create({
            title: "Mundo Mobile",
            subtitle: "",
            image: "",
            text: "Texto sobre o artigo",
            category_id: "mobile-01",
            manager_id: "author-01"
        })
        sut = new ShowArticlesByManagerIdService(
            database.articles
        )
    })

    it('should be able to get an Articles by manager id', async () => {
        const articles = await sut.handler({manager_id: 'author-01'})
        expect(articles[0].id).toEqual(expect.any(String))
    })
    

})