import { InMemoryArticles } from '../../repository/in-memory/in-memory-articles';
import { ArticlesRepository } from '../../repository/interfaces/interface-articles-repository';
import { ManagementRepository } from '../../repository/interfaces/interface-management-repository';
import { beforeEach, describe, expect, it } from 'vitest';
import { InMemoryManagement } from '../../repository/in-memory/in-memory-management';
import { ForbiddenOperationError } from '../../utils/errors/forbidden-operation-error';
import { DeleteArticlesService } from './delete-articles-service';

let articlesRepository: ArticlesRepository
let sut: DeleteArticlesService

describe('Delete Articles Service', () => {

    beforeEach(()=>{
        articlesRepository = new InMemoryArticles()

        sut = new DeleteArticlesService(
            articlesRepository,
        )
    })

    it('should be able to delete a Articles', async () => {
        
        const article = await articlesRepository.create({
            title: "Mundo Mobile",
            subtitle: "",
            text: "Texto sobre o artigo",
            category_id: "mobile-01",
            manager_id: "author-01"
        })

        const isDelete = await sut.handler({article_id: article.id, manager_id: "author-01"})
        expect(isDelete).toEqual(true)
    })
    it('should not be able to delete a Articles from other Authors', async () => {
        const article = await articlesRepository.create({
            title: "Mundo Mobile",
            subtitle: "",
            text: "Texto sobre o artigo",
            category_id: "mobile-01",
            manager_id: "admin-01"
        })
        await expect(() => 
             sut.handler({article_id: article.id, manager_id: "other-author-01"})
        ).rejects.toBeInstanceOf(ForbiddenOperationError)
    })
})