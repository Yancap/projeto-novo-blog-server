import { beforeEach, describe, expect, it } from 'vitest';
import { UpdateArticleService } from './update-article-service';
import { ForbiddenOperationError } from '../../utils/errors/forbidden-operation-error';
import { DatabaseMemory, InMemoryDatabase } from '../../repository/in-memory/in-memory-database';


let database: DatabaseMemory;
let sut: UpdateArticleService

describe('Update Articles Service', () => {

    beforeEach(()=>{
        database = new InMemoryDatabase()

        sut = new UpdateArticleService(
            database.articles,
            database.categories
        )
    })

    it('should be able to update a Articles', async () => {

        await database.categories.create({category: "mobile"})
        const management = await database.management.register({
            id: "author-01",
            name: "Yan Gabriel",
            email: "yan@gmail.com",
            password: "123"
        })
        await database.articles.create({
            id: "article-01",
            title: "Mundo Mobile",
            subtitle: "",
            image: "",
            text: "Texto sobre o artigo",
            category_id: "mobile-01",
            manager_id: management.id
        })

        const article = await sut.handler({
            id: "article-01",
            subtitle: "Subtitulo",
            manager_id: management.id
        })

        expect(article.subtitle).toEqual("Subtitulo")
    })
    
    it('should not be able to an author update other articles', async () => {

        await database.categories.create({category: "mobile"})
        const management = await database.management.register({
            id: "non-author",
            name: "Yan Gabriel",
            email: "yan@gmail.com",
            password: "123"
        })
        await database.articles.create({
            id: "article-01",
            title: "Mundo Mobile",
            subtitle: "",
            image: "",
            text: "Texto sobre o artigo",
            category_id: "mobile-01",
            manager_id: "other-author"
        })

        await expect(() => 
        sut.handler({
            id: "article-01",
            subtitle: "Subtitulo",
            manager_id: management.id
        }))
        .rejects.toBeInstanceOf(ForbiddenOperationError)
    })
})