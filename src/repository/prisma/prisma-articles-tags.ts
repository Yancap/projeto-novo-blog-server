import { Prisma } from "@prisma/client"
import { prisma } from "../../lib/prisma"
import { ArticlesTagsRepository } from "../interfaces/interface-articles-tags-repository"

export class PrismaArticlesTagsRepository implements ArticlesTagsRepository {
    async create(data: Prisma.ArticlesTagsUncheckedCreateInput){
        const articlesTags = await prisma.articlesTags.create({ data })
        return articlesTags
    } 
    async selectByTagsId(tag_id: string) {
        const articles_tags = await prisma.articlesTags.findMany({
            where: { tag_id }
        })

        return articles_tags
    }
    async selectByArticleId(article_id: string) {
        const articles_tags = await prisma.articlesTags.findMany({
            where: { article_id }
        })

        return articles_tags
    }
    
}