import { PrismaArticlesRepository } from "../../repository/prisma/prisma-articles"
import { PrismaCategoriesRepository } from "../../repository/prisma/prisma-categories"
import { PrismaManagementRepository } from "../../repository/prisma/prisma-management"
import { CreateArticleService } from "../../services/articles/create-articles-service"

export function makeCreateArticlesService(){
    const createArticlesService = new CreateArticleService(
        new PrismaArticlesRepository(),
        new PrismaCategoriesRepository,
        new PrismaManagementRepository()
    )
    return createArticlesService
}