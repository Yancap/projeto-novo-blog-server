import { FastifyReply, FastifyRequest } from "fastify"
import { ResourceNotFoundError } from "../../../utils/errors/resource-not-found-error"
import { makeGetAllArticlesForClientService } from "../../../factory/articles/make-get-all-articles-for-client-service"


export async function articlesGetAllForClient (request: FastifyRequest, reply: FastifyReply) {

    const getAllArticlesforClients = makeGetAllArticlesForClientService()
    try {
        const articles = await getAllArticlesforClients.handler()
        return reply.status(200).send({articles})    
    } catch (error) {
        if (error instanceof ResourceNotFoundError) {
            return reply.status(404).send({message: error.message})
        }
        return reply.status(500).send({error})
    }
}