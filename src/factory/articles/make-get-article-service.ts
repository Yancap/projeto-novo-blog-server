import { PrismaArticlesRepository } from "../../repository/prisma/prisma-articles"
import { GetArticleService } from "../../services/articles/get-article-service"

export function makeGetArticleService(){
    const getArticlesService = new GetArticleService(
        new PrismaArticlesRepository()
    )
    return getArticlesService
}