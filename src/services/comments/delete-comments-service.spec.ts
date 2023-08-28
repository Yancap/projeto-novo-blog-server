import { ArticlesRepository } from './../../repository/interfaces/interface-articles-repository';
import { beforeEach, describe, expect, it } from 'vitest';
import { CommentsRepository } from '../../repository/interfaces/interface-comments-repository';
import { InMemoryComments } from '../../repository/in-memory/in-memory-comments';
import { InMemoryArticles } from '../../repository/in-memory/in-memory-articles';
import { ResourceNotFoundError } from '../../utils/errors/resource-not-found-error';
import { DeleteCommentsService } from './delete-comments-service';
import { UsersRepository } from '../../repository/interfaces/interface-users-repository';
import { InMemoryUsers } from '../../repository/in-memory/in-memory-users';
import { CategoriesRepository } from '../../repository/interfaces/interface-categories-repository';
import { ManagementRepository } from '../../repository/interfaces/interface-management-repository';
import { InMemoryManagement } from '../../repository/in-memory/in-memory-management';
import { InMemoryCategories } from '../../repository/in-memory/in-memory-categories';

let commentsRepository: CommentsRepository
let articlesRepository: ArticlesRepository
let usersRepository: UsersRepository
let categoriesRepository: CategoriesRepository
let managementRepository: ManagementRepository

let sut: DeleteCommentsService

describe('Delete Comments Service', () => {

    beforeEach(()=>{
        managementRepository = new InMemoryManagement()
        categoriesRepository = new InMemoryCategories()

        usersRepository = new InMemoryUsers()
        articlesRepository = new InMemoryArticles(categoriesRepository, managementRepository)
        commentsRepository = new InMemoryComments(articlesRepository, usersRepository)
        
        sut = new DeleteCommentsService(commentsRepository, articlesRepository)
    })

    it('should be able to delete a Comment', async () => {
        const article = await articlesRepository.create({
            title: "Mundo Mobile",
            subtitle: "",
            text: "Texto sobre o artigo",
            image: "",
            category_id: "mobile-01",
            manager_id: "admin-01"
        })
        const comments = await commentsRepository.create({
            text: "gostei do artigo",
            user_id: '',
            article_id: article.id
        })
        const isDelete = await sut.handler({ comment_id: comments.id, article_id: article.id})
        expect(isDelete).toEqual(true)
    })

    
})