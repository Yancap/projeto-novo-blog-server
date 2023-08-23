import { PrismaArticlesRepository } from "../../repository/prisma/prisma-articles"
import { PrismaArticlesTagsRepository } from "../../repository/prisma/prisma-articles-tags"
import { PrismaTagsRepository } from "../../repository/prisma/prisma-tags"
import { CreateArticlesTagsService } from "../../services/articles-tags/create-articles-tags-services"

export function makeCreateArticlesTagsSService(){
    const createArticlesTagsService = new CreateArticlesTagsService(
        new PrismaArticlesTagsRepository,
        new PrismaArticlesRepository,
        new PrismaTagsRepository
    )
    return createArticlesTagsService
}