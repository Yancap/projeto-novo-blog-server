import { z } from "zod"
import { FastifyReply, FastifyRequest } from "fastify"
import { InvalidCredentialsError } from "../../../utils/errors/invalid-credentials-error"
import { makeLoginManagementService } from "../../../factory/management/make-login-management-service"
import { LoginTokenValidationService } from "../../../services/management/login-token-validation-service"
import { TokenExpiredError } from "jsonwebtoken"


export async function login (request: FastifyRequest, reply: FastifyReply) {
    
    const loginBodySchema = z.object({
        email: z.string().email(),
        password: z.string().min(6)
    })

    const { email, password } = loginBodySchema.parse(request.body)
    const loginManagementService = makeLoginManagementService()

    if (request.headers.authorization) {
        const [ ,token] = request.headers.authorization.split('')
        if(token) {
            const loginTokenValidationService = new LoginTokenValidationService()
            try {
                loginTokenValidationService.handler({token})
                const { token: newToken, manager } = await loginManagementService.handler({ email, password })
                return reply.status(200).send({
                    token: newToken
                })
            } catch(err) {
                if (err instanceof TokenExpiredError) {
                    
                } else {
                    return reply.status(500).send()
                }
            }
        }
    }
    try{
        const {token, manager} = await loginManagementService.handler({ email, password })
        return reply.status(200).send({
            token
        })

    } catch(err) {
        if (err instanceof InvalidCredentialsError) {
            return reply.status(400).send({ message: err.message })
        }
    }
    
}