import { PrismaArticlesRepository } from "../../repository/prisma/prisma-articles"
import { PrismaCommentsRepository } from "../../repository/prisma/prisma-comments"
import { PrismaUsersRepository } from "../../repository/prisma/prisma-users"
import { CreateCommentsService } from "../../services/comments/create-comments-service"
import { GetArticlesCommentsService } from "../../services/comments/get-articles-comments-service"
import { RegisterUsersService } from "../../services/users/register-users-service"

export function makeRegisterUsersService(){
    const registerUsersService = new RegisterUsersService(
        new PrismaUsersRepository
    )
    return registerUsersService
}