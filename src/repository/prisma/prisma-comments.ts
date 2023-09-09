import { Prisma } from "@prisma/client"
import { prisma } from "../../lib/prisma"
import { randomUUID } from "crypto"
import { ResourceNotFoundError } from "../../utils/errors/resource-not-found-error"
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library"
import { ForbiddenOperationError } from "../../utils/errors/forbidden-operation-error"
import { CommentsRepository, DeleteComments, UserDeleteComments } from "../interfaces/interface-comments-repository"

export class PrismaCommentsRepository implements CommentsRepository {
    async create(data: Prisma.CommentsUncheckedCreateInput){
        const comments = await prisma.comments.create({ 
            data
        })
        return comments
    }
    async delete({id, article_id}: DeleteComments){
        try{
            const comments = await prisma.comments.delete({ where: { id, article_id } })
            return comments
        }
        catch (error){
            if(error instanceof PrismaClientKnownRequestError){
              throw new ResourceNotFoundError()  
            }
            throw new ForbiddenOperationError()
            //throw new Error()
        }
        
    } 
    async deleteByUser({id, user_id}: UserDeleteComments){
        try{
            const comments = await prisma.comments.delete({ where: { id, user_id } })
            return comments
        }
        catch (error){
            if(error instanceof PrismaClientKnownRequestError){
              throw new ResourceNotFoundError()  
            }
            throw new ForbiddenOperationError()
            //throw new Error()
        }
        
    } 

    async findById(id: string){
        const comment = await prisma.comments.findUnique({
            where: { id }
        }) 
        return comment
    }
    
    async findByArticleId(article_id: string){
        try{
           const comment = await prisma.comments.findMany({
            where: { article_id },
            include: { 
                article: { 
                  select: 
                    { 
                      id: true, title: true, slug: true, 
                      category: { select: { category: true } } 
                    }
                },
                user: { select: { name: true, email: true }},
                
            }}) 
            return comment  
        } catch(error) {
            return null
        }
        
    }
}