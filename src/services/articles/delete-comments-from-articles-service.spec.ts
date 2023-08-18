import { ArticlesRepository } from './../../repository/interfaces/interface-articles-repository';
import { beforeEach, describe, expect, it } from 'vitest';
import { CommentsRepository } from '../../repository/interfaces/interface-comments-repository';
import { InMemoryComments } from '../../repository/in-memory/in-memory-comments';
import { InMemoryArticles } from '../../repository/in-memory/in-memory-articles';
import { DeleteCommentsFromArticlesService } from './delete-comments-from-articles-service';
import { ForbiddenOperationError } from '../../utils/errors/forbidden-operation-error';

let commentsRepository: CommentsRepository
let articlesRepository: ArticlesRepository

let sut: DeleteCommentsFromArticlesService

describe('Delete Comments from Articles Service', () => {

    beforeEach(()=>{
        commentsRepository = new InMemoryComments()
        articlesRepository = new InMemoryArticles()
        sut = new DeleteCommentsFromArticlesService( articlesRepository,commentsRepository )
    })

    it('should be able to delete a Comment from Article', async () => {
        const article = await articlesRepository.create({
            title: "Mundo Mobile",
            subtitle: "",
            text: "Texto sobre o artigo",
            category_id: "mobile-01",
            manager_id: "author-01"
        })
        const comments = await commentsRepository.create({
            text: "gostei do artigo",
            user_id: '',
            article_id: article.id
        })

        const isDelete = await sut.handler({ 
            comment_id: comments.id, 
            slug: article.slug,
            manager_id: "author-01"
        })

        expect(isDelete).toEqual(true)
    })

    it('should not be able to delete a Comment from other authors articles', async () => {
        const article = await articlesRepository.create({
            title: "Mundo Mobile",
            subtitle: "",
            text: "Texto sobre o artigo",
            category_id: "mobile-01",
            manager_id: "admin-01"
        })
        const comments = await commentsRepository.create({
            text: "gostei do artigo",
            user_id: '',
            article_id: article.id
        })

        await expect(() =>
        sut.handler({ 
            comment_id: comments.id, 
            slug: article.slug,
            manager_id: "author-01"
        })).rejects.toBeInstanceOf(ForbiddenOperationError)
    })
})