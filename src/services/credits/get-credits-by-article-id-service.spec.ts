import { beforeEach, describe, expect, it } from 'vitest';
import { ResourceNotFoundError } from '../../utils/errors/resource-not-found-error';
import { DatabaseMemory, InMemoryDatabase } from '../../repository/in-memory/in-memory-database';
import { GetCreditsByArticleIdService } from './get-credits-by-article-id-service';


let database: DatabaseMemory;
let sut: GetCreditsByArticleIdService

describe('Get credits by article id Service', () => {

    beforeEach(()=>{
        database = new InMemoryDatabase()
        sut = new GetCreditsByArticleIdService(
            database.credits
        )
    })

    it('should be able to get a Credits by article id', async () => {
        const article = await database.articles.create({
            title: "Mundo Mobile",
            subtitle: "",
            image: "",
            text: "Texto sobre o artigo",
            category_id: "mobile-01",
            manager_id: "admin-01",
            id: "article-01",
        })
        await database.credits.create({
            name: "link",
            link: "www.web.com",
            article_id: "article-01"
        })
        const credits = await sut.handler({article_id: article.id})
        expect(credits).toEqual(expect.any(Array))
        expect(credits[0].name).toEqual(expect.any(String))

    })

    it('should not be able to get a inexistent Credits', async () => {
        
        expect(sut.handler({article_id: "non-exist"}))
        .rejects.toBeInstanceOf(ResourceNotFoundError)
    })

    it('should not be able to get a Credits with inexistent article id', async () => {
        await database.credits.create({
            name: "link",
            link: "www.web.com",
            article_id: "article-01"
        })
        expect(sut.handler({article_id: "non-exist"}))
        .rejects.toBeInstanceOf(ResourceNotFoundError)
    })
})