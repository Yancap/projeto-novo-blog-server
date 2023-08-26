import { PrismaArticlesRepository } from "../../../repository/prisma/prisma-articles"
import { AdminGetAllArticlesService } from "../../../services/management/admin/admin-get-all-articles-services"

export function makeAdminGetAllArticlesService(){
    return new AdminGetAllArticlesService(new PrismaArticlesRepository()) 
}