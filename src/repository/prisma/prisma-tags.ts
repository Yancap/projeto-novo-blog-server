import { Prisma } from "@prisma/client"
import { prisma } from "../../lib/prisma"
import { ArticlesTagsRepository } from "../interfaces/interface-articles-tags-repository"
import { TagsRepository } from "../interfaces/interface-tags-repository"

export class PrismaTagsRepository implements TagsRepository {
    
    async create(data: Prisma.TagsUncheckedCreateInput){
        const tags = await prisma.tags.create({ data })
        return tags
    } 
    async findByName(name: string) {
        const tags = await prisma.tags.findFirst({
            where: { tag: name },
        })
        return tags
    }
    async findById(id: string) {
        const tags = await prisma.tags.findUnique({
            where: { id },
            select: { tag: true },
        })
        return { name: tags?.tag}
    }
}