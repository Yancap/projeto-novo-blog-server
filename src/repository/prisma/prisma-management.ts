import { Prisma } from "@prisma/client"
import { ManagementRepository } from "../interfaces/interface-management-repository"
import { prisma } from "../../lib/prisma"
import { AuthorDoesntExistError } from "../../utils/errors/admin/author-doesnt-exist-error"
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library"

export class PrismaManagementRepository implements ManagementRepository {
    async findById(id: string){
        const manager = await prisma.management.findUnique({ where:{ id } })
        return manager
    }
    async findAuthors(){
        const manager = await prisma.management.findMany({ where:{ hierarchy: "author" } })
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
        try {
            const manager = await prisma.management.delete({ 
                where:{
                    id
                }
            })   
            return manager
        } catch (error){
            if(error instanceof PrismaClientKnownRequestError){
              throw new AuthorDoesntExistError()  
            }
            throw new Error()
        }
        
        
    }
}