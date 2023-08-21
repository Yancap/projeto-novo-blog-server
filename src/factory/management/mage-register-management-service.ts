import { InMemoryManagement } from "../../repository/in-memory/in-memory-management"
import { PrismaManagementRepository } from "../../repository/prisma/prisma-management"
import { RegisterManagerService } from "../../services/management/register-manager-service"

export function makeRegisterManagerService(){
    const registerManagerService = new RegisterManagerService(new PrismaManagementRepository())
    return registerManagerService
}