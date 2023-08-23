import { PrismaArticlesRepository } from "../../../repository/prisma/prisma-articles"
import { AdminDeleteArticlesService } from "../../../services/management/admin/admin-delete-articles-service"

export function makeDeleteArticlesService(){
    return new AdminDeleteArticlesService(new PrismaArticlesRepository()) 
}