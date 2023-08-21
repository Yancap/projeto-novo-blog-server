import { z } from "zod"
import { FastifyReply, FastifyRequest } from "fastify"
import { InvalidCredentialsError } from "../../../utils/errors/invalid-credentials-error"
import { makeLoginManagementService } from "../../../factory/management/make-login-management-service"


export async function login (request: FastifyRequest, reply: FastifyReply) {
    
    const loginBodySchema = z.object({
        email: z.string().email(),
        password: z.string().min(6)
    })

    const { email, password } = loginBodySchema.parse(request.body)
    const loginManagementService = makeLoginManagementService()

    try{
        const { manager } = await loginManagementService.handler({ email, password })
        const token = await reply.jwtSign({
            hierarchy: manager.hierarchy
        }, {
            sign: {
                sub: manager.id
            }
        })

        return reply.status(200).send({
            token
        })

    } catch(err) {
        if (err instanceof InvalidCredentialsError) {
            return reply.status(400).send({ message: err.message })
        }
    }
    
}