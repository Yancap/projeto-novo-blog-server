import { FastifyReply, FastifyRequest } from "fastify"
import { ResourceNotFoundError } from "../../../utils/errors/resource-not-found-error"
import { makeGetArticleForClientService } from "../../../factory/articles/make-get-article-for-client-service"
import { z, ZodError } from "zod"


export async function articlesGetforClient (request: FastifyRequest, reply: FastifyReply) {
    const getParamsSchema = z.object({
        slug: z.string(),
    })

    const getArticleForClientService = makeGetArticleForClientService()
    try {
        const { slug } = getParamsSchema.parse(request.params)
        const articles = await getArticleForClientService.handler(slug)
        return reply.status(200).send({articles})    
    } catch (err) {
        if (err instanceof ResourceNotFoundError) {
            return reply.status(404).send({
                error: "ResourceNotFoundError",
                message: err.message
            })
        }
        if (err instanceof ZodError) {
            return reply.status(400).send({ 
                error: "ValidationRequestError",
                message: "Required email or password parameters" 
            })
        }
        return reply.status(500).send({err})
    }
}