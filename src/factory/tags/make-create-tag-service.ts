import { PrismaTagsRepository } from "../../repository/prisma/prisma-tags"
import { CreateTagService } from "../../services/tags/create-tag-service"

export function makeCreateTagsService(){
    const createTagService = new CreateTagService(
        new PrismaTagsRepository
    )
    return createTagService
}