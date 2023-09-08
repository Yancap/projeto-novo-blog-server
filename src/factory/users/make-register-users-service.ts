
import { PrismaUsersRepository } from "../../repository/prisma/prisma-users"
import { RegisterUsersService } from "../../services/users/register-users-service"

export function makeRegisterUsersService(){
    const registerUsersService = new RegisterUsersService(
        new PrismaUsersRepository
    )
    return registerUsersService
}