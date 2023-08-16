import { Credits, Prisma} from "@prisma/client";

export interface CreditsRepository {
    create(data: Prisma.CreditsUncheckedCreateInput): Promise<Credits>
    findCreditsByName(name: string): Promise<Credits | null>
}