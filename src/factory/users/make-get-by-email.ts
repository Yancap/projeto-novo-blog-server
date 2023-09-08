import { PrismaUsersRepository } from "../../repository/prisma/prisma-users"
import { GetUsersByEmailService } from "../../services/users/get-users-by-email-service"

export function makeGetUsersByEmail(){
    const getUsersByEmail = new GetUsersByEmailService(
        new PrismaUsersRepository
    )
    return getUsersByEmail
}