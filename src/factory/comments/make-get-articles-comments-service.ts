import { PrismaArticlesRepository } from "../../repository/prisma/prisma-articles"
import { PrismaCommentsRepository } from "../../repository/prisma/prisma-comments"
import { GetArticlesCommentsService } from "../../services/comments/get-articles-comments-service"

export function makeGetArticlesCommentsService(){
    const getArticlesCommentsService = new GetArticlesCommentsService(
        new PrismaCommentsRepository,
        new PrismaArticlesRepository
    )
    return getArticlesCommentsService
}