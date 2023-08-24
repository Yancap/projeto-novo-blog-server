import { InMemoryArticles } from '../../repository/in-memory/in-memory-articles';
import { ArticlesRepository } from '../../repository/interfaces/interface-articles-repository';
import { beforeEach, describe, expect, it } from 'vitest';
import { GetArticleService } from './get-article-service';


let articlesRepository: ArticlesRepository
let sut: GetArticleService

describe('Get a Article Service', () => {

    beforeEach(()=>{
        articlesRepository = new InMemoryArticles()
        
        sut = new GetArticleService(
            articlesRepository
        )
    })

    it('should be able to get an Articles', async () => {
        const articleCreated = await articlesRepository.create({
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