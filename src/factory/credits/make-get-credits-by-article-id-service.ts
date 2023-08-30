import { PrismaCreditsRepository } from "../../repository/prisma/prisma-credits"
import { GetCreditsByArticleIdService } from "../../services/credits/get-credits-by-article-id-service"

export function makeGetCreditsByArticleIdService(){
    const getCreditsByArticleIdService = new GetCreditsByArticleIdService(
        new PrismaCreditsRepository
    )
    return getCreditsByArticleIdService
}