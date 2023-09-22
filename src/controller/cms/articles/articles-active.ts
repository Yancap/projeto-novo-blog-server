import { FastifyReply, FastifyRequest } from "fastify"
import { ZodError, z } from "zod"
import { ResourceNotFoundError } from "../../../utils/errors/resource-not-found-error"
import { makeUpdateArticlesService } from "../../../factory/articles/make-update-articles-service"
import { JWTVerifyReturn } from "./jwt"
import { ForbiddenOperationError } from "../../../utils/errors/forbidden-operation-error"


export async function articlesActive (request: FastifyRequest, reply: FastifyReply) {
    //Adicionar as Tags, sua relação e os créditos
    
    const registerBodySchema = z.object({
        id: z.string()
    })
    const {sub}: JWTVerifyReturn = await request.jwtVerify()
    
    const updateArticlesService = makeUpdateArticlesService()
    try {
        const {id} = registerBodySchema.parse(request.params)
        const articleUpdated = await updateArticlesService.handler({ id: id, state: "active", manager_id: sub })
        return reply.status(200).send({article: articleUpdated})    
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