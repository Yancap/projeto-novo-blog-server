import { z, ZodError } from "zod"
import { FastifyReply, FastifyRequest } from "fastify"
import { makeChangeAvatarServiceService } from '../../../factory/management/make-change-avatar-service'
import { JWTVerifyReturn } from '../articles/jwt'
import { OperationNotPerformedError } from '../../../utils/errors/operation-not-performed-error'


export async function managementChangeAvatar (request: FastifyRequest, reply: FastifyReply) {
    
    const loginBodySchema = z.object({
        avatar: z.string()
    })
    const changeAvatarServiceService = makeChangeAvatarServiceService()
    
    try{
      const {sub}: JWTVerifyReturn = await request.jwtVerify()
      const { avatar } = loginBodySchema.parse(request.body)
      await changeAvatarServiceService.handler({ avatar, id: sub })
      
      return reply.status(200).send({ message: "success"})  
    } catch(err) {
      if (err instanceof OperationNotPerformedError) {
          return reply.status(401).send({ 
              error: "OperationNotPerformedError",
              message: err.message 
          })
      }
      if (err instanceof ZodError) {
          return reply.status(400).send({ 
              error: "ValidationRequestError",
              message: "Required email or password parameters" 
          })
      }
    }
    
}