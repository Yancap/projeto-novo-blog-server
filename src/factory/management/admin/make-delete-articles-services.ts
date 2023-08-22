import { PrismaManagementRepository } from "../../../repository/prisma/prisma-management"
import { DeleteArticlesService } from "../../../services/articles/delete-articles-service"

// TODO
export function makeDeleteArticlesService(){
    return new DeleteArticlesService() 
}