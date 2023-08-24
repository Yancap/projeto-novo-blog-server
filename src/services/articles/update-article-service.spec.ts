import { InMemoryArticles } from '../../repository/in-memory/in-memory-articles';
import { ArticlesRepository } from '../../repository/interfaces/interface-articles-repository';
import { ManagementRepository } from '../../repository/interfaces/interface-management-repository';
import { CategoriesRepository } from '../../repository/interfaces/interface-categories-repository';
import { beforeEach, describe, expect, it } from 'vitest';
import { InMemoryCategories } from '../../repository/in-memory/in-memory-categories';
import { InMemoryManagement } from '../../repository/in-memory/in-memory-management';
import { UpdateArticleService } from './update-article-service';
import { ForbiddenOperationError } from '../../utils/errors/forbidden-operation-error';


let categoriesRepository: CategoriesRepository
let managementRepository: ManagementRepository
let articlesRepository: ArticlesRepository
let sut: UpdateArticleService

describe('Update Articles Service', () => {

    beforeEach(()=>{
        categoriesRepository = new InMemoryCategories()
        articlesRepository = new InMemoryArticles()
        managementRepository = new InMemoryManagement()

        sut = new UpdateArticleService(
            articlesRepository,
            categoriesRepository
        )
    })

    it('should be able to update a Articles', async () => {

        await categoriesRepository.create({category: "mobile"})
        const management = await managementRepository.register({
            name: "Yan Gabriel",
            email: "yan@gmail.com",
            password: "123"
        })
        await articlesRepository.create({
            id: "article-01",
            title: "Mundo Mobile",
            subtitle: "",
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

        await categoriesRepository.create({category: "mobile"})
        const management = await managementRepository.register({
            id: "non-author",
            name: "Yan Gabriel",
            email: "yan@gmail.com",
            password: "123"
        })
        await articlesRepository.create({
            id: "article-01",
            title: "Mundo Mobile",
            subtitle: "",
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