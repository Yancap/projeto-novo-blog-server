import { CategoriesRepository } from './../interfaces/interface-categories-repository';
import { Categories, Prisma } from '@prisma/client';


export class InMemoryCategories implements CategoriesRepository {
    public items: Categories[] = []

    async create(data: Prisma.CategoriesCreateInput) {
        const category = {
            id: data.id ?? 'category-01',
            category: data.category
        }
        this.items.push(category)
        return category
    }
    
    async findCategory(name: string) {
        const item = this.items.find(category => category.category === name)
        if(!item) {
            return null
        }
        return item
    }
    async findById(id: string) {
        const item = this.items.find(category => category.id === id)
        if(!item) {
            return null
        }
        return item
    }
    async getAllCategories() {
       return this.items
        
    }
}