import { FastifyReply, FastifyRequest } from "fastify"
import { ResourceNotFoundError } from "../../../utils/errors/resource-not-found-error"
import { z, ZodError } from "zod"
import { makeUserDeleteCommentsService } from "../../../factory/comments/make-user-delete-comment-service"
import { JWTVerifyReturn } from "../../cms/articles/jwt"


export async function commentsUserDelete (request: FastifyRequest, reply: FastifyReply) {
    const registerBodySchema = z.object({
        comment_id: z.string()
    })

    
    const {sub}: JWTVerifyReturn = await request.jwtVerify()
    
    const userDeleteCommentsService = makeUserDeleteCommentsService()
    try {
        const { comment_id } = registerBodySchema.parse(request.params)
        
        const comments = await userDeleteCommentsService.handler({comment_id, user_id: sub})
        
        
        if (comments) {
            return reply.status(200).send({message: "success"})    
        }
        return reply.status(404).send({message: "not found"})  
        
         
    } catch (err) {
        if (err instanceof ResourceNotFoundError) {
            return reply.status(404).send({
                error: "ResourceNotFoundError",
                message: err.message
            })
        }
        if (err instanceof ZodError) {
            return reply.status(400).send({ 
                error: "ValidationRequestError",
                message: "Required email or password parameters" 
            })
        }
        return reply.status(500).send({err})
    }
}