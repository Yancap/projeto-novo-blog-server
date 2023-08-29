import { FastifyReply, FastifyRequest } from "fastify"
import { ResourceNotFoundError } from "../../../utils/errors/resource-not-found-error"
import { z } from "zod"
import { makeRegisterUsersService } from "../../../factory/users/make-register-users-service"


export async function userRegister (request: FastifyRequest, reply: FastifyReply) {
    const registerBodySchema = z.object({
        name: z.string(),
        email: z.string(),
        avatar: z.string(),
    })
    const { name, avatar, email } = registerBodySchema.parse(request.body)
    const registerUserService = makeRegisterUsersService()
    try {
        const user = await registerUserService.handler({name, avatar, email})
        const token = await reply.jwtSign({}, {
            sign: {
                sub: user.id
            }
        })
        return reply.status(200).send({user: {
            ...user, token
        }})    
    } catch (error) {
        if (error instanceof ResourceNotFoundError) {
            return reply.status(404).send({message: error.message})
        }
        return reply.status(500).send({error})
    }
}