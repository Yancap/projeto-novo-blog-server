import { ArticlesRepository } from '../../../repository/interfaces/interface-articles-repository';
import { beforeEach, describe, expect, it } from 'vitest';
import { ManagementRepository } from '../../../repository/interfaces/interface-management-repository';
import { InMemoryManagement } from '../../../repository/in-memory/in-memory-management';
import { AdminDeleteArticlesService } from './admin-delete-articles-service';
import { InMemoryArticles } from '../../../repository/in-memory/in-memory-articles';
import { OnlyAdminError } from '../../../utils/errors/only-admin-error';
import { InMemoryCategories } from '../../../repository/in-memory/in-memory-categories';
import { CategoriesRepository } from '../../../repository/interfaces/interface-categories-repository';

let managementRepository: ManagementRepository
let articlesRepository: ArticlesRepository
let categoriesRepository: CategoriesRepository
let sut: AdminDeleteArticlesService

describe('Admin Delete Articles Service', () => {

    beforeEach(()=>{
        managementRepository = new InMemoryManagement()
        categoriesRepository = new InMemoryCategories()
        articlesRepository = new InMemoryArticles({categoriesRepository, managementRepository})
        sut = new AdminDeleteArticlesService(articlesRepository)
    })

    it('should be able to delete a Article', async () => {
        

        const article = await articlesRepository.create({
            title: "Mundo Mobile",
            image: "",
            subtitle: "",
            text: "Texto sobre o artigo",
            category_id: "category-01",
            manager_id: "manager-01"
        })
        const isDelete = await sut.handler({article_id: article.id})

        expect(isDelete).toEqual(true)
    })

    
})