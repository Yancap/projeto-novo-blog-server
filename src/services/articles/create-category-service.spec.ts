import { CategoriesRepository } from '../../repository/interfaces/interface-categories-repository';
import { beforeEach, describe, expect, it } from 'vitest';
import { EmailAlreadyExistsError } from '../../utils/errors/email-already-exists-error';
import { CreateCategoryService } from './create-category-service';
import { InMemoryCategories } from '../../repository/in-memory/in-memory-categories';

let categoriesRepository: CategoriesRepository
let sut: CreateCategoryService

describe('Create Category Service', () => {

    beforeEach(()=>{
        categoriesRepository = new InMemoryCategories()
        sut = new CreateCategoryService(categoriesRepository)
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