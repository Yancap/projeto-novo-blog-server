import { Prisma } from "@prisma/client"
import { ManagementRepository } from "../interfaces/interface-management-repository"
import { prisma } from "../../lib/prisma"
import { CategoriesRepository } from "../interfaces/interface-categories-repository"

export class PrismaCategoriesRepository implements CategoriesRepository {
    async create(data: Prisma.CategoriesCreateInput){
        const category = await prisma.categories.create({ data })
        return category
    } 
    async findCategory(name: string){
        const category = await prisma.categories.findUnique({
            where: { category: name }
        }) 
        return category
    }
    
}