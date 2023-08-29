import { FastifyReply, FastifyRequest } from "fastify"
import { ResourceNotFoundError } from "../../../utils/errors/resource-not-found-error"
import { makeGetArticlesCommentsService } from "../../../factory/comments/make-get-articles-comments-service"
import { z } from "zod"
import { makeDeleteCommentsService } from "../../../factory/comments/make-delete-comments-service"


export async function commentsManagerDelete (request: FastifyRequest, reply: FastifyReply) {
    const registerBodySchema = z.object({
        article_id: z.string(),
        comment_id: z.string()
    })

    const { article_id, comment_id } = registerBodySchema.parse(request.body)

    const deleteCommentsService = makeDeleteCommentsService()
    try {
         
        const comments = await deleteCommentsService.handler({article_id, comment_id})
        
        if (comments) {
            return reply.status(200).send({message: "success"})    
        }
        return reply.status(404).send({message: "not found"})  
        
         
    } catch (error) {
        if (error instanceof ResourceNotFoundError) {
            return reply.status(404).send({message: error.message})
        }
        return reply.status(500).send({error})
    }
}