import { FastifyReply, FastifyRequest } from "fastify"
import { z } from "zod"
import { ResourceNotFoundError } from "../../../utils/errors/resource-not-found-error"
import { makeGetArticleService } from "../../../factory/articles/make-get-article-service"


export async function articlesGet (request: FastifyRequest, reply: FastifyReply) {
    
    const getQuerySchema = z.object({
        id: z.optional(z.string()),
        slug: z.optional(z.string()),
    })

    
    const getArticlesService = makeGetArticleService()
    try {
        const { id, slug } = getQuerySchema.parse(request.query)
        if (id) {
            const article = await getArticlesService.handler({ article_id: id })
            return reply.status(200).send({ article })    
        } else if (slug) {
            const article = await getArticlesService.handler({ slug: slug })
            return reply.status(200).send({ article }) 
        }
        return reply.status(400).send({
            error: "ValidationRequestError",
            message: "ID or Slug parameters are missing"
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