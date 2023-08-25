import { PrismaManagementRepository } from "../../../repository/prisma/prisma-management"
import { AdminGetAuthorsService } from "../../../services/management/admin/admin-get-authors-service"

export function makeGetAuthorsServices(){
    return new AdminGetAuthorsService(new PrismaManagementRepository()) 
}