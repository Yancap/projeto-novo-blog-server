import { PrismaArticlesRepository } from "../../repository/prisma/prisma-articles"
import { GetAllArticlesForClientService } from "../../services/articles/get-all-articles-for-client-service"

export function makeGetAllArticlesForClientService(){
    return new GetAllArticlesForClientService(
        new PrismaArticlesRepository()
    )
    
}