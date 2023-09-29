import { FastifyReply, FastifyRequest } from "fastify";

export async function verifyJWT(request: FastifyRequest, reply: FastifyReply) {
    try {
        await request.jwtVerify()
        
        
        if(!request.user.hierarchy){
            
            throw new Error()
        }
    } catch (err) {
        return reply.status(401).send( {
            error: "InvalidOrNotExistentTokenError",
            message: "Unathorized"
        } )
    }
}