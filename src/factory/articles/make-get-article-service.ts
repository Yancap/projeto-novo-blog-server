import { PrismaArticlesRepository } from "../../repository/prisma/prisma-articles"
import { GetArticleService } from "../../services/articles/get-article-service"

export function makeGetArticleService(){
    const createArticlesService = new GetArticleService(
        new PrismaArticlesRepository()
    )
    return createArticlesService
}