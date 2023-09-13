import { expect, describe, it } from 'vitest';
import { InMemoryDatabase } from '../../repository/in-memory/in-memory-database';
import { GetAllCategoriesService } from './get-all-categories-service';

describe('Get all categories Service',  () => {
    it('should be able to get all categories', async ()=> {
        const database = new InMemoryDatabase()
        const getAllCategoriesService = new GetAllCategoriesService(database.categories)
        const categories = await getAllCategoriesService.handler()
        expect(categories)
    })
})
