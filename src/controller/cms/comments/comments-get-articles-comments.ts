import { FastifyReply, FastifyRequest } from "fastify"
import { ResourceNotFoundError } from "../../../utils/errors/resource-not-found-error"
import { makeGetArticlesCommentsService } from "../../../factory/comments/make-get-articles-comments-service"
import { z } from "zod"


export async function commentsGetArticlesComments (request: FastifyRequest, reply: FastifyReply) {
    const registerBodySchema = z.object({
        article_id: z.optional(z.string()),
        slug: z.optional(z.string())
    })

    const { article_id, slug } = registerBodySchema.parse(request.body)

    const getArticlesCommentsService = makeGetArticlesCommentsService()
    try {
        if(article_id) {
            const comments = await getArticlesCommentsService.handler({article_id})
        
            if (comments) {
                return reply.status(200).send(comments)    
            }
            return reply.status(200).send(null)  
        } else {
             const comments = await getArticlesCommentsService.handler({slug})
        
            if (comments) {
                return reply.status(200).send(comments)    
            }
            return reply.status(200).send(null)   
        }
         
    } catch (error) {
        if (error instanceof ResourceNotFoundError) {
            return reply.status(404).send({message: error.message})
        }
        return reply.status(500).send({error})
    }
}