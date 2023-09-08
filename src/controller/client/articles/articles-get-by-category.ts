import { FastifyReply, FastifyRequest } from "fastify"
import { ResourceNotFoundError } from "../../../utils/errors/resource-not-found-error"
import { makeGetArticleForClientService } from "../../../factory/articles/make-get-article-for-client-service"
import { z } from "zod"
import { makeGetArticlesByCategoryService } from "../../../factory/articles/make-get-articles-by-category"


export async function articlesGetbyCategory (request: FastifyRequest, reply: FastifyReply) {
    const registerBodySchema = z.object({
        category: z.string(),
    })

    const { category } = registerBodySchema.parse(request.body)
    const getArticleByCategoryService = makeGetArticlesByCategoryService()
    try {
        const articles = await getArticleByCategoryService.handler({category})
        return reply.status(200).send({articles})    
    } catch (error) {
        if (error instanceof ResourceNotFoundError) {
            return reply.status(404).send({message: error.message})
        }
        return reply.status(500).send({error})
    }
}