import { Prisma } from "@prisma/client"
import { prisma } from "../../lib/prisma"
import { UsersRepository } from "../interfaces/interface-users-repository"

export class PrismaUsersRepository implements UsersRepository {
    async register(data: Prisma.UsersCreateInput){
        const user = await prisma.users.create({
            data
        })
        return user
    }
    async findById(id: string){
        const user = await prisma.users.findUnique({ where:{ id } })
        return user
    }
    async findByEmail(email: string){
        const user = await prisma.management.findUnique({ 
            where:{
                email
            }
        })
        return user
    }
    async deleteById(id: string){
        const user = await prisma.users.delete({ where:{ id } })
        return user
    }
}