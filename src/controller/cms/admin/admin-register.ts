import { FastifyReply, FastifyRequest } from "fastify"
import { makeRegisterManagerService } from "../../../factory/management/make-register-management-service"
import { z } from "zod"
import { EmailAlreadyExistsError } from "../../../utils/errors/email-already-exists-error"


export async function adminRegister (request: FastifyRequest, reply: FastifyReply) {
    const registerBodySchema = z.object({
        name: z.string(),
        email: z.string().email(),
        password: z.string(),
        hierarchy: z.optional(z.string())
    })
    const registerManagerService = makeRegisterManagerService()
    const {name, email, password, hierarchy} = registerBodySchema.parse(request.body)
    try{
        const manager = await registerManagerService.handler({name, email, password, hierarchy})
        return reply.status(200).send({name: manager.name})
    } catch (error){
        if (error instanceof EmailAlreadyExistsError) {
            return reply.status(400).send({ message: error.message })
        }
    }
    
    
}