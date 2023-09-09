import { PrismaArticlesRepository } from "../../repository/prisma/prisma-articles"
import { PrismaCommentsRepository } from "../../repository/prisma/prisma-comments"
import { DeleteCommentsService } from "../../services/comments/delete-comments-service"
import { GetArticlesCommentsService } from "../../services/comments/get-articles-comments-service"
import { UserDeleteCommentsService } from "../../services/comments/user-delete-comment-service"

export function makeUserDeleteCommentsService(){
    return new UserDeleteCommentsService(
        new PrismaCommentsRepository
    )
     
}