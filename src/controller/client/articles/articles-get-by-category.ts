import { FastifyReply, FastifyRequest } from "fastify"
import { ResourceNotFoundError } from "../../../utils/errors/resource-not-found-error"
import { makeGetArticleForClientService } from "../../../factory/articles/make-get-article-for-client-service"
import { z, ZodError } from "zod"
import { makeGetArticlesByCategoryService } from "../../../factory/articles/make-get-articles-by-category"


export async function articlesGetbyCategory (request: FastifyRequest, reply: FastifyReply) {
    const registerBodySchema = z.object({
        category: z.string(),
    })

    const getArticleByCategoryService = makeGetArticlesByCategoryService()
    try {
        const { category } = registerBodySchema.parse(request.body)
        const articles = await getArticleByCategoryService.handler({category})
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