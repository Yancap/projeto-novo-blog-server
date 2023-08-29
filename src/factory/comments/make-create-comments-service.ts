import { PrismaArticlesRepository } from "../../repository/prisma/prisma-articles"
import { PrismaCommentsRepository } from "../../repository/prisma/prisma-comments"
import { CreateCommentsService } from "../../services/comments/create-comments-service"
import { GetArticlesCommentsService } from "../../services/comments/get-articles-comments-service"

export function makeCreateCommentsService(){
    const createCommentsService = new CreateCommentsService(
        new PrismaCommentsRepository,
        new PrismaArticlesRepository
    )
    return createCommentsService
}