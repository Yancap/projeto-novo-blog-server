import { FastifyReply, FastifyRequest } from "fastify"
import { ResourceNotFoundError } from "../../../utils/errors/resource-not-found-error"
import { makeGetArticlesCommentsService } from "../../../factory/comments/make-get-articles-comments-service"
import { z, ZodError } from "zod"
import { makeDeleteCommentsService } from "../../../factory/comments/make-delete-comments-service"
import { ForbiddenOperationError } from "../../../utils/errors/forbidden-operation-error"


export async function commentsManagerDelete (request: FastifyRequest, reply: FastifyReply) {
    const deleteBodySchema = z.object({
        article_id: z.string(),
        comment_id: z.string()
    })

    const deleteCommentsService = makeDeleteCommentsService()
    try {
        const { article_id, comment_id } = deleteBodySchema.parse(request.body)
        const comments = await deleteCommentsService.handler({article_id, comment_id})
        
        if (comments) {
            return reply.status(200).send({message: "success"})    
        }
        return reply.status(404).send({message: "not found"})  
        
         
    } catch (error) {
        if (error instanceof ResourceNotFoundError) {
            return reply.status(404).send({
                error: "ResourceNotFoundError",
                message: error.message
            })
        }
        if (error instanceof ZodError) {
            return reply.status(400).send({
                error: "ValidationRequestError",
                message: "Missing mandatory router parameters"
            })
        }
        if (error instanceof ForbiddenOperationError) {
            return reply.status(404).send({
                error: "ForbiddenOperationError",
                message: "Article does not exist"
            })
        }
        return reply.status(500).send({error})
    }
}