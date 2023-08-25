import { FastifyReply, FastifyRequest } from "fastify"
import { z } from "zod"
import { makeAdminDeleteArticlesService } from "../../../factory/management/admin/make-delete-articles-services"
import { ResourceNotFoundError } from "../../../utils/errors/resource-not-found-error"


export async function adminDeleteArticles (request: FastifyRequest, reply: FastifyReply) {
    const registerBodySchema = z.object({
        id: z.string()
    })
    const {id} = registerBodySchema.parse(request.body)
    
    const deleteAdminArticlesService = makeAdminDeleteArticlesService()
    try {
        await deleteAdminArticlesService.handler({ article_id: id })
        return reply.status(200).send({message: "success" })    
    } catch (error) {
        if (error instanceof ResourceNotFoundError) {
            return reply.status(404).send({message: error.message})
        }
        return reply.status(500).send({error})
    }
}