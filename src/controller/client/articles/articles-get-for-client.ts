import { FastifyReply, FastifyRequest } from "fastify"
import { ResourceNotFoundError } from "../../../utils/errors/resource-not-found-error"
import { makeGetArticleForClientService } from "../../../factory/articles/make-get-article-for-client-service"
import { z } from "zod"


export async function articlesGetforClient (request: FastifyRequest, reply: FastifyReply) {
    const getParamsSchema = z.object({
        slug: z.string(),
    })

    const getArticleForClientService = makeGetArticleForClientService()
    try {
        const { slug } = getParamsSchema.parse(request.params)
        const articles = await getArticleForClientService.handler(slug)
        return reply.status(200).send({articles})    
    } catch (error) {
        if (error instanceof ResourceNotFoundError) {
            return reply.status(404).send({message: error.message})
        }
        return reply.status(500).send({error})
    }
}