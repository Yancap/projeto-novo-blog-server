import { Credits, Prisma} from "@prisma/client";

export interface CreditsRepository {
    create(data: Prisma.CreditsUncheckedCreateInput): Promise<Credits>
    findCreditsByArticleId(article_id: string): Promise<Credits[] | null>
}