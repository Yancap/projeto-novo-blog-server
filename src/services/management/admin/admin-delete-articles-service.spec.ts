import { ArticlesRepository } from '../../../repository/interfaces/interface-articles-repository';
import { beforeEach, describe, expect, it } from 'vitest';
import { ManagementRepository } from '../../../repository/interfaces/interface-management-repository';
import { InMemoryManagement } from '../../../repository/in-memory/in-memory-management';
import { AdminDeleteArticlesService } from './admin-delete-articles-service';
import { InMemoryArticles } from '../../../repository/in-memory/in-memory-articles';
import { OnlyAdminError } from '../../../utils/errors/only-admin-error';
import { InMemoryCategories } from '../../../repository/in-memory/in-memory-categories';
import { CategoriesRepository } from '../../../repository/interfaces/interface-categories-repository';
import { DatabaseMemory, InMemoryDatabase } from '../../../repository/in-memory/in-memory-database';

let database: DatabaseMemory
let sut: AdminDeleteArticlesService

describe('Admin Delete Articles Service', () => {

    beforeEach(()=>{
        database = new InMemoryDatabase()
        sut = new AdminDeleteArticlesService(database.articles)
    })

    it('should be able to delete a Article', async () => {
        await database.categories.create({
            category: "front-end",
            id: "category-01"
        })
        const article = await database.articles.create({
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