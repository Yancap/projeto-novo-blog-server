import { FastifyReply, FastifyRequest } from "fastify"
import { makeRegisterManagerService } from "../../../factory/management/make-register-management-service"
import { z, ZodError } from "zod"
import { EmailAlreadyExistsError } from "../../../utils/errors/email-already-exists-error"


export async function adminRegister (request: FastifyRequest, reply: FastifyReply) {
    const registerBodySchema = z.object({
        name: z.string(),
        email: z.string().email(),
        password: z.string(),
        hierarchy: z.optional(z.string()),
        id: z.optional(z.string())
    })
    const registerManagerService = makeRegisterManagerService()
    
    try{
        const {name, email, password, hierarchy, id} = registerBodySchema.parse(request.body)
        const manager = await registerManagerService.handler({name, email, password, hierarchy, id})
        return reply.status(200).send({name: manager.name, email: manager.email})
    } catch (error){
        
        console.log(error);
        if (error instanceof EmailAlreadyExistsError) {
            return reply.status(400).send({ 
                error: "EmailAlreadyExistsError",
                message: error.message 
            })
        }
        if (error instanceof ZodError) {
            return reply.status(400).send({ 
                error: "ValidationRequestError",
                message: "Required mandatory parameters" 
            })
        }
        
        return reply.status(500).send({ message: error })
    }
    
    
}