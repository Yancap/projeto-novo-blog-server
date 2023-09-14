import { beforeEach, describe, expect, it } from 'vitest';
import { DeleteCommentsFromArticlesService } from './delete-comments-from-articles-service';
import { ForbiddenOperationError } from '../../utils/errors/forbidden-operation-error';
import { DatabaseMemory, InMemoryDatabase } from '../../repository/in-memory/in-memory-database';
import { ResourceNotFoundError } from '../../utils/errors/resource-not-found-error';

let database: DatabaseMemory;
let sut: DeleteCommentsFromArticlesService

describe('Delete Comments from Articles Service', () => {

    beforeEach(()=>{
        database = new InMemoryDatabase()
        sut = new DeleteCommentsFromArticlesService( database.articles, database.comments )
    })

    it('should be able to delete a Comment from Article', async () => {
        const article = await database.articles.create({
            title: "Mundo Mobile",
            subtitle: "",
            image: "",
            text: "Texto sobre o artigo",
            category_id: "mobile-01",
            manager_id: "author-01"
        })
        const comments = await database.comments.create({
            text: "gostei do artigo",
            user_id: '',
            article_id: article.id
        })

        const isDelete = await sut.handler({ 
            comment_id: comments.id, 
            article_id: article.id,
            manager_id: "author-01"
        })

        expect(isDelete).toEqual(true)
    })

    it('should not be able to delete a Comment from other authors articles', async () => {
        const article = await database.articles.create({
            title: "Mundo Mobile",
            subtitle: "",
            image: "",
            text: "Texto sobre o artigo",
            category_id: "mobile-01",
            manager_id: "admin-01"
        })
        const comments = await database.comments.create({
            text: "gostei do artigo",
            user_id: '',
            article_id: article.id
        })

        await expect(() =>
        sut.handler({ 
            comment_id: comments.id, 
            article_id: article.slug,
            manager_id: "author-01"
        })).rejects.toBeInstanceOf(ForbiddenOperationError)
    })
  
    
})