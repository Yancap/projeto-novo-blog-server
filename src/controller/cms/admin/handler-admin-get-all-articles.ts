import { FastifyReply, FastifyRequest } from "fastify"
import { ResourceNotFoundError } from "../../../utils/errors/resource-not-found-error"
import { makeAdminGetAllArticlesService } from "../../../factory/management/admin/make-get-all-articles-services"


export async function adminGetAllArticles (request: FastifyRequest, reply: FastifyReply) {
    
    const adminGetAllArticlesService = makeAdminGetAllArticlesService()
    try {
        const articles = await adminGetAllArticlesService.handler()
        return reply.status(200).send({articles})    
    } catch (error) {
        if (error instanceof ResourceNotFoundError) {
            return reply.status(404).send({message: error.message})
        }
        return reply.status(500).send({message: error})
    }
}