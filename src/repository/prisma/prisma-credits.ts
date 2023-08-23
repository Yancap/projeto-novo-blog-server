import { Prisma } from "@prisma/client"
import { prisma } from "../../lib/prisma"
import { CreditsRepository } from "../interfaces/interface-credits-repository"

export class PrismaCreditsRepository implements CreditsRepository {
    
    async create(data: Prisma.CreditsUncheckedCreateInput){
        const credits = await prisma.credits.create({ data })
        return credits
    } 
    async findCreditsByName(name: string) {
        const credits = await prisma.credits.findFirst({
            where: { name },
        })
        return credits
    }
    
}