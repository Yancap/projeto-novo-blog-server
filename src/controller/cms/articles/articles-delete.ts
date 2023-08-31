import { FastifyReply, FastifyRequest } from "fastify"
import { z } from "zod"
import { ResourceNotFoundError } from "../../../utils/errors/resource-not-found-error"
import { makeDeleteArticleService } from "../../../factory/articles/make-delete-articles-service"
import { JWTVerifyReturn } from "./jwt"


export async function articlesDelete (request: FastifyRequest, reply: FastifyReply) {
    //Adicionar as Tags, sua relação e os créditos
    
    const registerBodySchema = z.object({
        id: z.string()
    })
    const {sub}: JWTVerifyReturn = await request.jwtVerify()
    const {id} = registerBodySchema.parse(request.body)
    
    const deleteArticlesService = makeDeleteArticleService()
    try {
        await deleteArticlesService.handler({ article_id: id,  manager_id: sub })
        return reply.status(200).send({message: "success" })    
    } catch (error) {
        if (error instanceof ResourceNotFoundError) {
            return reply.status(404).send({message: error.message})
        }
        return reply.status(500).send({error})
    }
    
}