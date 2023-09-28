import { FastifyReply, FastifyRequest } from "fastify"
import { ResourceNotFoundError } from "../../../utils/errors/resource-not-found-error"
import { z } from "zod"
import { makeRegisterUsersService } from "../../../factory/users/make-register-users-service"
import { makeGetUsersByEmail } from "../../../factory/users/make-get-by-email"


export async function userGetByEmail (request: FastifyRequest, reply: FastifyReply) {
    const getBodySchema = z.object({
        email: z.string(),
    })
    const getUsersByEmail = makeGetUsersByEmail()
    try {
        const { email } = getBodySchema.parse(request.params)
        const user = await getUsersByEmail.handler({ email })
        if(!user) return reply.status(200).send(null)
        const token = await reply.jwtSign({}, {
            sign: {
                sub: user.id
            }
        })
        return reply.status(200).send({user: {
            name: user.name,
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
        return reply.status(500).send({err})
    }
}