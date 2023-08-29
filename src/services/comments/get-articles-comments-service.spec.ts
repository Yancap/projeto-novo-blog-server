import { ArticlesRepository } from '../../repository/interfaces/interface-articles-repository';
import { beforeEach, describe, expect, it } from 'vitest';
import { CommentsRepository } from '../../repository/interfaces/interface-comments-repository';
import { InMemoryComments } from '../../repository/in-memory/in-memory-comments';
import { InMemoryArticles } from '../../repository/in-memory/in-memory-articles';
import { UsersRepository } from '../../repository/interfaces/interface-users-repository';
import { CategoriesRepository } from '../../repository/interfaces/interface-categories-repository';
import { ManagementRepository } from '../../repository/interfaces/interface-management-repository';
import { InMemoryManagement } from '../../repository/in-memory/in-memory-management';
import { InMemoryCategories } from '../../repository/in-memory/in-memory-categories';
import { InMemoryUsers } from '../../repository/in-memory/in-memory-users';
import { GetArticlesCommentsService } from './get-articles-comments-service';

let commentsRepository: CommentsRepository
let articlesRepository: ArticlesRepository
let usersRepository: UsersRepository
let categoriesRepository: CategoriesRepository
let managementRepository: ManagementRepository

let sut: GetArticlesCommentsService

describe('Create Comments Service', () => {

    beforeEach(()=>{
        managementRepository = new InMemoryManagement()
        categoriesRepository = new InMemoryCategories()

        usersRepository = new InMemoryUsers()
        articlesRepository = new InMemoryArticles(categoriesRepository, managementRepository)
        commentsRepository = new InMemoryComments(articlesRepository, usersRepository)

        sut = new GetArticlesCommentsService(commentsRepository)
    })

    it.only('should be able to get Articles Comments', async () => {
        const user = await usersRepository.register({
            name: "user", 
            email: "user@gmail.com",
            avatar: "",
        })
        const article = await articlesRepository.create({
            title: "Mundo Mobile",
            subtitle: "",
            text: "Texto sobre o artigo",
            category_id: "mobile-01",
            image: '',
            manager_id: "admin-01"
        })

        await commentsRepository.create({
            text: "asd",
            user_id: user.id,
            article_id: article.id
        })
        const comments  = await sut.handler({article_id: article.id})
        expect(comments?.article.id).toEqual(expect.any(String))
        expect(comments?.comments.length).toEqual(1)
    })

})