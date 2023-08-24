import { FastifyReply, FastifyRequest, FastifyError } from "fastify"
import { makeGetProfileService } from "../../../factory/management/make-get-profile-service"
import { InvalidCredentialsError } from "../../../utils/errors/invalid-credentials-error";

interface JWTVerifyReturn{
    sub: string
}
export async function profile (request: FastifyRequest, reply: FastifyReply) {
    try{
        const token: JWTVerifyReturn = await request.jwtVerify()
        console.log(token);
        
        const getProfileService = makeGetProfileService()
        const {manager} = await getProfileService.handler({id: token.sub as string})
        return reply.status(200).send({
            name: manager.name,
            avatar: manager.avatar
            
        })  
    } catch (error) {
        
        if (error instanceof InvalidCredentialsError) {
            return reply.status(404).send({ message: error.message });
        }
        return reply.status(401).send( {message: "Unauthorized"} )
        
    }
    
}