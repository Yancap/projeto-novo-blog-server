import { PrismaArticlesRepository } from "../../repository/prisma/prisma-articles"
import { PrismaCreditsRepository } from "../../repository/prisma/prisma-credits"
import { CreateCreditsService } from "../../services/credits/create-credits-service"

export function makeCreateCreditsService(){
    const createCreditsService = new CreateCreditsService(
        new PrismaCreditsRepository,
        new PrismaArticlesRepository
    )
    return createCreditsService
}