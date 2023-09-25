import { FastifyReply, FastifyRequest } from "fastify"
import { ResourceNotFoundError } from "../../../utils/errors/resource-not-found-error"
import { z } from "zod"
import { makeGetCreditsByArticleIdService } from "../../../factory/credits/make-get-credits-by-article-id-service"
import { makeGetTagsByArticleId } from "../../../factory/tags/make-get-tags-by-article-id"


export async function tagsGetByArticleId (request: FastifyRequest, reply: FastifyReply) {
    const paramsBodySchema = z.object({
        article_id: z.string()
    })
    const getTagsByArticleId = makeGetTagsByArticleId()
    try {
        const { article_id } = paramsBodySchema.parse(request.params)
        const tags = await getTagsByArticleId.handler({article_id})
        if (tags) {
            return reply.status(200).send({tags})    
        }
        
        return reply.status(404).send({
            error: "ResourceNotFoundError",
            message: "Resource not found."
        }) 
    } catch (error) {
        if (error instanceof ResourceNotFoundError) {
            return reply.status(404).send({
                error: "ResourceNotFoundError",
                message: error.message
            })
        }
        return reply.status(500).send({error})
    }
}