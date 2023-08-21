import { Prisma } from "@prisma/client"
import { ManagementRepository } from "../interfaces/interface-management-repository"
import { prisma } from "../../lib/prisma"

export class PrismaManagementRepository implements ManagementRepository {
    async findById(id: string){
        const manager = await prisma.management.findUnique({ where:{ id } })
        return manager
    }
    async findByEmail(email: string){
        const manager = await prisma.management.findUnique({ 
            where:{
                email
            }
        })
        return manager
    }
    async register(data: Prisma.ManagementCreateInput){
        const manager = await prisma.management.create({
            data
        })
        return manager
    }
    async deleteById(id: string){
        const manager = await prisma.management.delete({ 
            where:{
                id
            }
        })
        return manager
    }
}