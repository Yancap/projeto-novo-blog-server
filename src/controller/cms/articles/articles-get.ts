import { FastifyReply, FastifyRequest } from "fastify"
import { z } from "zod"
import { ResourceNotFoundError } from "../../../utils/errors/resource-not-found-error"
import { makeGetArticleService } from "../../../factory/articles/make-get-article-service"


export async function articlesGet (request: FastifyRequest, reply: FastifyReply) {
    //Adicionar as Tags, sua relação e os créditos
    
    const registerBodySchema = z.object({
        id: z.string()
    })

    const { id } = registerBodySchema.parse(request.body)
    const getArticlesService = makeGetArticleService()
    try {
        const article = await getArticlesService.handler({ article_id: id })
        return reply.status(200).send({ article })    
    } catch (error) {
        if (error instanceof ResourceNotFoundError) {
            return reply.status(404).send({message: error.message})
        }
        return reply.status(500).send({error})
    }
    
}