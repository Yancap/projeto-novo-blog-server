import { FastifyReply, FastifyRequest } from "fastify"
import { ResourceNotFoundError } from "../../../utils/errors/resource-not-found-error"
import { makeGetArticlesCommentsService } from "../../../factory/comments/make-get-articles-comments-service"
import { z } from "zod"


export async function commentsGetArticlesComments (request: FastifyRequest, reply: FastifyReply) {
    const registerBodySchema = z.object({
        article_id: z.string()
    })

    const { article_id } = registerBodySchema.parse(request.body)

    const getArticlesCommentsService = makeGetArticlesCommentsService()
    try {
        const comments = await getArticlesCommentsService.handler({article_id})
        if (comments) {
            return reply.status(200).send(comments)    
        }
        return reply.status(200).send({comments: null})  
    } catch (error) {
        if (error instanceof ResourceNotFoundError) {
            return reply.status(404).send({message: error.message})
        }
        return reply.status(500).send({error})
    }
}