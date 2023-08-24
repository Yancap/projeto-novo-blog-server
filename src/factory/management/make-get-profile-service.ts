import { PrismaManagementRepository } from "../../repository/prisma/prisma-management"
import { GetProfileService } from "../../services/management/get-profile-service"

export function makeGetProfileService(){
    const getProfileService = new GetProfileService(new PrismaManagementRepository())
    return getProfileService
}