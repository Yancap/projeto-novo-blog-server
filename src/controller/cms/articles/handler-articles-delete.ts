import { FastifyReply, FastifyRequest } from "fastify"
import { z, ZodError } from "zod"
import { ResourceNotFoundError } from "../../../utils/errors/resource-not-found-error"
import { makeDeleteArticleService } from "../../../factory/articles/make-delete-articles-service"
import { JWTVerifyReturn } from "./jwt"
import { ForbiddenOperationError } from "../../../utils/errors/forbidden-operation-error"


export async function articlesDelete (request: FastifyRequest, reply: FastifyReply) {
    //Adicionar as Tags, sua relação e os créditos
    
    const registerBodySchema = z.object({
        id: z.string()
    })
    const {sub}: JWTVerifyReturn = await request.jwtVerify()
    
    
    const deleteArticlesService = makeDeleteArticleService()
    try {
        const {id} = registerBodySchema.parse(request.params)
        await deleteArticlesService.handler({ article_id: id,  manager_id: sub })
        return reply.status(200).send({message: "success" })    
    } catch (error) {
        if (error instanceof ResourceNotFoundError) {
            return reply.status(404).send({
                error: "ResourceNotFoundError",
                message: error.message
            })
        }
        if(error instanceof ZodError) {
            return reply.status(400).send({
                error: "ValidationRequestError",
                message: "Missing mandatory router parameters"
            })
        }
        if(error instanceof ForbiddenOperationError) {
            return reply.status(404).send({
                error: "ForbiddenOperationError",
                message: "invalid or absent parameters"
            })
        }
        return reply.status(500).send({error})
    }
    
}