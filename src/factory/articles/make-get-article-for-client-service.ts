import { PrismaArticlesRepository } from "../../repository/prisma/prisma-articles"
import { GetArticleForClientService } from "../../services/articles/get-article-for-client-service"

export function makeGetArticleForClientService(){
    return new GetArticleForClientService(
        new PrismaArticlesRepository()
    )
    
}