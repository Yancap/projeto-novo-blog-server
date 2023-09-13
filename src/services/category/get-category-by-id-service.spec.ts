import { expect, describe, it, beforeEach } from 'vitest';
import { DatabaseMemory, InMemoryDatabase } from '../../repository/in-memory/in-memory-database';
import { GetCategoryByIdService } from './get-category-by-id-service';

let database: DatabaseMemory
describe('Get category by id Service',  () => {
    beforeEach(() => {
        database = new InMemoryDatabase()
        database.categories.create({ category: 'front-end', id: "category-01" })
    })
    it('should be able to get category by id', async ()=> {
        const getCategoryByIdService = new GetCategoryByIdService(database.categories)
        const categories = await getCategoryByIdService.handler({category_id: "category-01"})
        expect(categories).toEqual(expect.any(Object))
    })
})
