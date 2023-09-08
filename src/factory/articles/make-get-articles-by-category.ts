import { GetArticlesByCategoryService } from './../../services/articles/get-articles-by-category';
import { PrismaArticlesRepository } from "../../repository/prisma/prisma-articles"

export function makeGetArticlesByCategoryService(){
    return new GetArticlesByCategoryService(
        new PrismaArticlesRepository()
    )
     
}