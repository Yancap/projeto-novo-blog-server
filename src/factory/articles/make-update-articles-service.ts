import { PrismaArticlesRepository } from "../../repository/prisma/prisma-articles"
import { PrismaCategoriesRepository } from "../../repository/prisma/prisma-categories"
import { UpdateArticleService } from "../../services/articles/update-article-service"

export function makeUpdateArticlesService(){
    const updateArticlesService = new UpdateArticleService(
        new PrismaArticlesRepository(),
        new PrismaCategoriesRepository
    )
    return updateArticlesService
}