import { PrismaManagementRepository } from "../../repository/prisma/prisma-management"
import { ChangeAvatarService } from '../../services/management/change-avatar-service'

export function makeChangeAvatarServiceService(){
    const changeAvatarService = new ChangeAvatarService(new PrismaManagementRepository())
    return changeAvatarService
}