import { InMemoryManagement } from "../../repository/in-memory/in-memory-management"
import { PrismaManagementRepository } from "../../repository/prisma/prisma-management"
import { LoginManagerService } from "../../services/management/login-manager-service"

export function makeLoginManagementService(){
    const loginManagementService = new LoginManagerService(new PrismaManagementRepository())
    return loginManagementService
}