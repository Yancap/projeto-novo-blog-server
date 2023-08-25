import { FastifyReply, FastifyRequest } from "fastify"
import { ResourceNotFoundError } from "../../../utils/errors/resource-not-found-error"
import { makeUpdateArticlesService } from "../../../factory/articles/make-update-articles-service"
import { makeShowArticlesByManagerIdService } from "../../../factory/articles/make-show-articles-by-manager-id-service"
import { JWTVerifyReturn } from "./jwt"


export async function articlesShowByManagerId (request: FastifyRequest, reply: FastifyReply) {
    
    const {sub}: JWTVerifyReturn = await request.jwtVerify()
    const showArticlesByManagerIdService = makeShowArticlesByManagerIdService()
    try {
        const articles = await showArticlesByManagerIdService.handler({ manager_id: sub })
        return reply.status(200).send({ articles })    
    } catch (error) {
        if (error instanceof ResourceNotFoundError) {
            return reply.status(404).send({message: error.message})
        }
        return reply.status(500).send({error})
    }
    
}