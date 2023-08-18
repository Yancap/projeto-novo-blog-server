import { InMemoryArticles } from '../../repository/in-memory/in-memory-articles';
import { ArticlesRepository } from '../../repository/interfaces/interface-articles-repository';
import { ManagementRepository } from '../../repository/interfaces/interface-management-repository';
import { CategoriesRepository } from '../../repository/interfaces/interface-categories-repository';
import { beforeEach, describe, expect, it } from 'vitest';
import { InMemoryCategories } from '../../repository/in-memory/in-memory-categories';
import { CreateArticleService } from './create-articles-service';
import { InMemoryManagement } from '../../repository/in-memory/in-memory-management';
import { ForbiddenOperationError } from '../../utils/errors/forbidden-operation-error';


let categoriesRepository: CategoriesRepository
let managementRepository: ManagementRepository
let articlesRepository: ArticlesRepository
let sut: CreateArticleService

describe('Create Articles Service', () => {

    beforeEach(()=>{
        categoriesRepository = new InMemoryCategories()
        articlesRepository = new InMemoryArticles()
        managementRepository = new InMemoryManagement()

        sut = new CreateArticleService(
            articlesRepository,
            categoriesRepository,
            managementRepository
        )
    })

    it('should be able to create a Articles', async () => {

        await categoriesRepository.create({category: "mobile"})
        const management = await managementRepository.register({
            name: "Yan Gabriel",
            email: "yan@gmail.com",
            password: "123"
        })

        const article = await sut.handler({
            title: "Mundo Mobile",
            subtitle: "",
            text: "Texto sobre o artigo",
            category: "mobile",
            management_id: management.id
        })

        expect(article.id).toEqual(expect.any(String))
    })
    it('should not be able to create a Articles without Manager', async () => {
        await categoriesRepository.create({category: "mobile"})
        expect(async () => 
        await sut.handler({
            title: "Mundo Mobile",
            subtitle: "",
            text: "Texto sobre o artigo",
            category: "mobile",
            management_id: ""
        }))
        .rejects.toBeInstanceOf(ForbiddenOperationError)
    })
    it('should be able to create a Articles without a Category Existent', async () => {
        
        const management = await managementRepository.register({
            name: "Yan Gabriel",
            email: "yan@gmail.com",
            password: "123"
        })

        const article = await sut.handler({
            title: "Mundo Mobile",
            subtitle: "",
            text: "Texto sobre o artigo",
            category: "mobile",
            management_id: management.id
        })

        expect(article.id).toEqual(expect.any(String))
    })

})