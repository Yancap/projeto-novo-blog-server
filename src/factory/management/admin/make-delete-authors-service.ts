import { PrismaManagementRepository } from "../../../repository/prisma/prisma-management"
import { DeleteAuthorsService } from "../../../services/management/admin/delete-authors-service"

export function makeDeleteAuthorsService(){
    return new DeleteAuthorsService(new PrismaManagementRepository()) 
}