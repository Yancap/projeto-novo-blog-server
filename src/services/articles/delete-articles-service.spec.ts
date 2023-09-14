import { beforeEach, describe, expect, it } from 'vitest';
import { ForbiddenOperationError } from '../../utils/errors/forbidden-operation-error';
import { DeleteArticlesService } from './delete-articles-service';
import { DatabaseMemory, InMemoryDatabase } from '../../repository/in-memory/in-memory-database';

let database: DatabaseMemory;
let sut: DeleteArticlesService

describe('Delete Articles Service', () => {

    beforeEach(async ()=>{
        database = new InMemoryDatabase()
        await database.management.register({
            email: "yan@email.com",
            password: "123",
            name: "Yan",
            id: "author-01"
        })
        sut = new DeleteArticlesService(database.articles)
    })

    it('should be able to delete a Articles', async () => {
        
        const article = await database.articles.create({
            title: "Mundo Mobile",
            subtitle: "",
            image: "",
            text: "Texto sobre o artigo",
            category_id: "mobile-01",
            manager_id: "author-01"
        })
        
        const isDelete = await sut.handler({article_id: article.id, manager_id: "author-01"})
        expect(isDelete).toEqual(true)
    })
    it('should not be able to delete a Articles from other Authors', async () => {
        const article = await database.articles.create({
            title: "Mundo Mobile",
            subtitle: "",
            image: "",
            text: "Texto sobre o artigo",
            category_id: "mobile-01",
            manager_id: "admin-01"
        })
        await expect(() => 
             sut.handler({article_id: article.id, manager_id: "other-author-01"})
        ).rejects.toBeInstanceOf(ForbiddenOperationError)
    })
})