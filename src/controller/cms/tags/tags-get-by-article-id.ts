import { FastifyReply, FastifyRequest } from "fastify"
import { ResourceNotFoundError } from "../../../utils/errors/resource-not-found-error"
import { z } from "zod"
import { makeGetCreditsByArticleIdService } from "../../../factory/credits/make-get-credits-by-article-id-service"
import { makeGetTagsByArticleId } from "../../../factory/tags/make-get-tags-by-article-id"


export async function tagsGetByArticleId (request: FastifyRequest, reply: FastifyReply) {
    const registerBodySchema = z.object({
        article_id: z.string()
    })

    const { article_id } = registerBodySchema.parse(request.body)
    const getTagsByArticleId = makeGetTagsByArticleId()
    try {

        const tags = await getTagsByArticleId.handler({article_id})
        if (tags) {
            return reply.status(200).send({tags})    
        }
        
        return reply.status(200).send(null)  
    } catch (error) {
        if (error instanceof ResourceNotFoundError) {
            return reply.status(404).send({message: error.message})
        }
        return reply.status(500).send({error})
    }
}