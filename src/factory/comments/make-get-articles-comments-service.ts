import { PrismaCommentsRepository } from "../../repository/prisma/prisma-comments"
import { GetArticlesCommentsService } from "../../services/comments/get-articles-comments-service"

export function makeGetArticlesCommentsService(){
    const getArticlesCommentsService = new GetArticlesCommentsService(
        new PrismaCommentsRepository
    )
    return getArticlesCommentsService
}