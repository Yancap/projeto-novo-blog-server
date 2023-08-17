import { ArticlesRepository } from './../../repository/interfaces/interface-articles-repository';
import { beforeEach, describe, expect, it } from 'vitest';
import { CommentsRepository } from '../../repository/interfaces/interface-comments-repository';
import { InMemoryComments } from '../../repository/in-memory/in-memory-comments';
import { InMemoryArticles } from '../../repository/in-memory/in-memory-articles';
import { ResourceNotFoundError } from '../../utils/errors/resource-not-found-error';
import { DeleteCommentsService } from './delete-comments-service';

let commentsRepository: CommentsRepository
let articlesRepository: ArticlesRepository

let sut: DeleteCommentsService

describe('Delete Comments Service', () => {

    beforeEach(()=>{
        commentsRepository = new InMemoryComments()
        articlesRepository = new InMemoryArticles()
        sut = new DeleteCommentsService(commentsRepository, articlesRepository)
    })

    it('should be able to delete a Comment', async () => {
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
        const isDelete = await sut.handler({ id: comments.id, slug: article.slug})
        expect(isDelete).toEqual(true)
    })

    
})