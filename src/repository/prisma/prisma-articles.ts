import { Prisma } from "@prisma/client"
import { prisma } from "../../lib/prisma"
import { ArticlesRepository, articleIdAndManagerIdProps } from "../interfaces/interface-articles-repository"
import { randomUUID } from "crypto"
import { ResourceNotFoundError } from "../../utils/errors/resource-not-found-error"
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library"
import { ForbiddenOperationError } from "../../utils/errors/forbidden-operation-error"

export class PrismaArticlesRepository implements ArticlesRepository {
    async create(data: Prisma.ArticlesUncheckedCreateInput){
        const slug = data.slug ?? data.title.toLowerCase()
        .replace(/[^\w\s]/g, '')
        .replace(/\s+/g, '-') + 
        '-' + (randomUUID()).substring(0,6)
        
        const articles = await prisma.articles.create({ 
            data: {
            ...data,
            slug: slug
            }
        })
        return articles
    }
    async showAll(){
        const articles = await prisma.articles.findMany({
            include: {
                manager: { select: { name: true } },
                category: { select: { category: true } }
            }
        })
        return articles
    }
    async showAllForClients(){
        const articles = await prisma.articles.findMany({
            where: {
                state: "active"
            },
            include: {
                manager: { select: { name: true, avatar: true } },
                category: { select: { category: true } },
                credits: { select: { name: true, link: true }},
                articleTags: { select: { tag: { select: { tag: true } } } }
            }
        })
        return articles
    }
    async showAllByManagerId(manager_id: string){
        return await prisma.articles.findMany({ where: { manager_id } })
    }
    async delete({article_id}: Omit<articleIdAndManagerIdProps, "manager_id">){
        try{
            const articles = await prisma.articles.delete({ where: { id: article_id } })
            return articles
        }
        catch (error){
            if(error instanceof PrismaClientKnownRequestError){
              throw new ResourceNotFoundError()  
            }
            throw new ForbiddenOperationError()
            //throw new Error()
        }
        
    } 
    async deleteByAdmin({article_id}: Omit<articleIdAndManagerIdProps, "manager_id">){
        try{
            const articles = await prisma.articles.delete({ where: { id: article_id } })
            return articles
        }
        catch (error){
            if(error instanceof PrismaClientKnownRequestError){
              throw new ResourceNotFoundError()  
            }
            throw new Error()
        }
        
    }
    async update(data: Prisma.ArticlesUncheckedCreateInput){
        let slug: string | null = null
        if (data.title && typeof data.title === 'string') {
            const slug = data.title.toLowerCase()
            .replace(/[^\w\s]/g, '')
            .replace(/\s+/g, '-') + 
            '-' + (randomUUID()).substring(0,6)
        }
        if (data.id && data.manager_id) {
            const articles = await prisma.articles.update({ 
                where: {
                    id: data.id,
                    manager_id: data.manager_id
                },
                data: {
                    ...data,
                    slug: slug ?? data.slug
                }
            })
            return articles  
        }
        throw new ResourceNotFoundError()
        
    } 

    async findById(id: string){
        const article = await prisma.articles.findUnique({
            where: { id },
            include: {
                manager: { select: { name: true } },
                category: { select: { category: true } }
            }
        }) 
        return article
    }
    
    async findBySlug(slug: string){
        const article = await prisma.articles.findUnique({
            where: { slug },
            include: {
                manager: { select: { name: true, avatar: true } },
                category: { select: { category: true } },
                credits: { select: { name: true, link: true }},
                articleTags: { select: { tag: { select: { tag: true } } } }
            }
        }) 
        return article
    }
    async findByCategory(category: string){
        const articles = await prisma.articles.findMany({
            where: { category: { category } },
            include: {
                manager: { select: { name: true, avatar: true } },
                category: { select: { category: true } },
                credits: { select: { name: true, link: true }},
                articleTags: { select: { tag: { select: { tag: true } } } }
            }
        }) 
        return articles
    }
    async findByArticleIdAndManagerId({article_id, manager_id}: articleIdAndManagerIdProps){
        const article = await prisma.articles.findUnique({
            where: { id: article_id, manager_id}
        }) 
        return article
    }
    
}