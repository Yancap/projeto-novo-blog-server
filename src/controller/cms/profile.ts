import { FastifyReply, FastifyRequest } from "fastify"
import { makeGetProfileService } from "../../factory/management/make-get-profile-service"


export async function profile (request: FastifyRequest, reply: FastifyReply) {
    const {sub} = await request.jwtVerify()
    
    const getProfileService = makeGetProfileService()
    const manager = await getProfileService.handler({id: sub as string})
    return reply.status(200).send({
        name: manager.name,
        avatar: manager.avatar
        
    })
}