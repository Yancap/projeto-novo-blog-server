import { PrismaArticlesRepository } from "../../repository/prisma/prisma-articles"
import { PrismaCommentsRepository } from "../../repository/prisma/prisma-comments"
import { DeleteCommentsService } from "../../services/comments/delete-comments-service"
import { GetArticlesCommentsService } from "../../services/comments/get-articles-comments-service"

export function makeDeleteCommentsService(){
    const getArticlesCommentsService = new DeleteCommentsService(
        new PrismaCommentsRepository
    )
    return getArticlesCommentsService
}