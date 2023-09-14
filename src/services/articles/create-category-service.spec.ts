import { beforeEach, describe, expect, it } from 'vitest';
import { CreateCategoryService } from './create-category-service';
import { DatabaseMemory, InMemoryDatabase } from '../../repository/in-memory/in-memory-database';

let database: DatabaseMemory;
let sut: CreateCategoryService

describe('Create Category Service', () => {

    beforeEach(()=>{
        database = new InMemoryDatabase()
        sut = new CreateCategoryService(database.categories)
    })

    it('should be able to create a Category', async () => {
        const categories  = await sut.handler({
            category: "mobile",
        })
        expect(categories.id).toEqual(expect.any(String))
    })

    it('should not be able to create a Category with two name', async () => {
        await sut.handler({
            category: "mobile",
        })
        await expect(() => sut.handler({
            category: "mobile",
        })).rejects.toBeInstanceOf(Error)
    })

})