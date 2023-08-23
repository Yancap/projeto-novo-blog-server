import { InMemoryArticles } from '../../repository/in-memory/in-memory-articles';
import { ArticlesRepository } from '../../repository/interfaces/interface-articles-repository';
import { beforeEach, describe, expect, it } from 'vitest';
import { ShowArticlesService } from './show-articles-service';


let articlesRepository: ArticlesRepository
let sut: ShowArticlesService

describe('Show All Articles Service', () => {

    beforeEach(()=>{
        articlesRepository = new InMemoryArticles()
        articlesRepository.create({
            title: "Mundo Mobile",
            subtitle: "",
            text: "Texto sobre o artigo",
            category_id: "mobile-01",
            manager_id: "author-01"
        })
        sut = new ShowArticlesService(
            articlesRepository
        )
    })

    it('should be able to get an Articles', async () => {
        const articles = await sut.handler()
        expect(articles[0].id).toEqual(expect.any(String))
    })
    

})