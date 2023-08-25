import { PrismaArticlesRepository } from "../../repository/prisma/prisma-articles"
import { ShowArticlesByManagerIdService } from "../../services/articles/show-articles-by-manager-id-service"

export function makeShowArticlesByManagerIdService(){
    const showArticlesByManagerIdsService = new ShowArticlesByManagerIdService(
        new PrismaArticlesRepository()
    )
    return showArticlesByManagerIdsService
}