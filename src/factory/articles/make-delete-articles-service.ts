import { PrismaArticlesRepository } from "../../repository/prisma/prisma-articles"
import { DeleteArticlesService } from "../../services/articles/delete-articles-service"

export function makeDeleteArticleService(){
    const deleteArticlesService = new DeleteArticlesService(
        new PrismaArticlesRepository()
    )
    return deleteArticlesService
}