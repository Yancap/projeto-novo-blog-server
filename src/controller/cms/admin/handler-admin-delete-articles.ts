import { FastifyReply, FastifyRequest } from "fastify"
import { z, ZodError } from "zod"
import { makeAdminDeleteArticlesService } from "../../../factory/management/admin/make-delete-articles-services"
import { ResourceNotFoundError } from "../../../utils/errors/resource-not-found-error"


export async function adminDeleteArticles (request: FastifyRequest, reply: FastifyReply) {
    const registerBodySchema = z.object({
        article_id: z.string()
    })

    try {
        const {article_id} = registerBodySchema.parse(request.body)

        const deleteAdminArticlesService = makeAdminDeleteArticlesService()
        await deleteAdminArticlesService.handler({ article_id })

        return reply.status(200).send({message: "success" })    
    } catch (error) {
        if (error instanceof ResourceNotFoundError) {
            return reply.status(404).send({
                error: "ResourceNotFoundError",
                message: error.message
            })
        }
        if (error instanceof ZodError) {
            return reply.status(400).send({
                error: "ValidationRequestError",
                message: "Required article id"
            })
        }
        return reply.status(500).send({error})
    }
}