import { FastifyReply, FastifyRequest } from "fastify"
import { ResourceNotFoundError } from "../../../utils/errors/resource-not-found-error"
import { z, ZodError } from "zod"
import { makeCreateCommentsService } from "../../../factory/comments/make-create-comments-service"
import { JWTVerifyReturn } from "../../cms/articles/jwt"


export async function commentsCreate (request: FastifyRequest, reply: FastifyReply) {
    const registerBodySchema = z.object({
        slug: z.string(),
        text: z.string()
    })
    const { slug, text } = registerBodySchema.parse(request.body)
    const createCommentsService = makeCreateCommentsService()
    const {sub}: JWTVerifyReturn = await request.jwtVerify()

    try {
        const comments = await createCommentsService.handler({slug, user_id: sub, text})
        return reply.status(200).send({comments})    
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