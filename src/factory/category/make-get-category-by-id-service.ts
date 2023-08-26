import { PrismaArticlesRepository } from "../../repository/prisma/prisma-articles"
import { PrismaCategoriesRepository } from "../../repository/prisma/prisma-categories"
import { PrismaManagementRepository } from "../../repository/prisma/prisma-management"
import { CreateArticleService } from "../../services/articles/create-articles-service"
import { GetCategoryByIdService } from "../../services/category/get-category-by-id-service"

export function makeGetCategoryByIdService(){
    const getCategoryByIdService = new GetCategoryByIdService(
        new PrismaCategoriesRepository
    )
    return getCategoryByIdService
}