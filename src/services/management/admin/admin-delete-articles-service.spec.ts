import { ArticlesRepository } from '../../../repository/interfaces/interface-articles-repository';
import { beforeEach, describe, expect, it } from 'vitest';
import { ManagementRepository } from '../../../repository/interfaces/interface-management-repository';
import { InMemoryManagement } from '../../../repository/in-memory/in-memory-management';
import { AdminDeleteArticlesService } from './admin-delete-articles-service';
import { InMemoryArticles } from '../../../repository/in-memory/in-memory-articles';
import { OnlyAdminError } from '../../../utils/errors/only-admin-error';

let managementRepository: ManagementRepository
let articlesRepository: ArticlesRepository
let sut: AdminDeleteArticlesService

describe('Admin Delete Articles Service', () => {

    beforeEach(()=>{
        managementRepository = new InMemoryManagement()
        articlesRepository = new InMemoryArticles()
        sut = new AdminDeleteArticlesService(articlesRepository)
    })

    it('should be able to delete a Article', async () => {
        

        const article = await articlesRepository.create({
            title: "Mundo Mobile",
            subtitle: "",
            text: "Texto sobre o artigo",
            category_id: "category-01",
            manager_id: "manager-01"
        })
        const isDelete = await sut.handler({article_id: article.id})

        expect(isDelete).toEqual(true)
    })

    
})