import { FastifyReply, FastifyRequest } from "fastify"
import { ResourceNotFoundError } from "../../../utils/errors/resource-not-found-error"
import { z, ZodError } from "zod"
import { makeRegisterUsersService } from "../../../factory/users/make-register-users-service"


export async function userRegister (request: FastifyRequest, reply: FastifyReply) {
    const registerBodySchema = z.object({
        name: z.string(),
        email: z.string(),
        avatar: z.optional(z.string()),
    })
    
    const registerUserService = makeRegisterUsersService()
    try {
        const { name, avatar, email } = registerBodySchema.parse(request.body)
        const user = await registerUserService.handler({name, avatar, email})
        const token = await reply.jwtSign({}, {
            sign: {
                sub: user.id
            }
        })
        return reply.status(200).send({user: {
            name:user.name,
            email: user.email,
            avatar: user.avatar, 
            token
        }})    
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