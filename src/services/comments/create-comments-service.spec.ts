import { ArticlesRepository } from './../../repository/interfaces/interface-articles-repository';
import { beforeEach, describe, expect, it } from 'vitest';
import { CreateCommentsService } from './create-comments-service';
import { CommentsRepository } from '../../repository/interfaces/interface-comments-repository';
import { InMemoryComments } from '../../repository/in-memory/in-memory-comments';
import { InMemoryArticles } from '../../repository/in-memory/in-memory-articles';
import { ResourceNotFoundError } from '../../utils/errors/resource-not-found-error';
import { UsersRepository } from '../../repository/interfaces/interface-users-repository';
import { CategoriesRepository } from '../../repository/interfaces/interface-categories-repository';
import { ManagementRepository } from '../../repository/interfaces/interface-management-repository';
import { InMemoryManagement } from '../../repository/in-memory/in-memory-management';
import { InMemoryCategories } from '../../repository/in-memory/in-memory-categories';
import { InMemoryUsers } from '../../repository/in-memory/in-memory-users';

let commentsRepository: CommentsRepository
let articlesRepository: ArticlesRepository
let usersRepository: UsersRepository
let categoriesRepository: CategoriesRepository
let managementRepository: ManagementRepository

let sut: CreateCommentsService

describe('Create Comments Service', () => {

    beforeEach(()=>{
        managementRepository = new InMemoryManagement()
        categoriesRepository = new InMemoryCategories()

        usersRepository = new InMemoryUsers()
        articlesRepository = new InMemoryArticles(categoriesRepository, managementRepository)
        commentsRepository = new InMemoryComments(articlesRepository, usersRepository)

        sut = new CreateCommentsService(commentsRepository, articlesRepository)
    })

    it('should be able to create a Comment', async () => {
        const article = await articlesRepository.create({
            title: "Mundo Mobile",
            subtitle: "",
            text: "Texto sobre o artigo",
            category_id: "mobile-01",
            image: '',
            manager_id: "admin-01"
        })
        const comments  = await sut.handler({
            text: "gostei do artigo",
            user_id: '',
            slug: article.slug
        })
        expect(comments.id).toEqual(expect.any(String))
    })
    it('should be able to create a Comment in Inexistent Article', async () => {
        await expect(() => 
        sut.handler({
            text: "gostei do artigo",
            user_id: '',
            slug: 'not-exist'
        }))
        .rejects.toBeInstanceOf(ResourceNotFoundError)
    })

})