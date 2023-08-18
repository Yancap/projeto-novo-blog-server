//import { PrismaUsersRepository } from "../../repositories/prisma/prisma-users-repository"
import { InMemoryManagement } from "../../repository/in-memory/in-memory-management"
import { LoginManagerService } from "../../services/management/login-manager-service"

export function makeLoginManagementService(){
    const loginManagementService = new LoginManagerService(new InMemoryManagement())
    return loginManagementService
}