import { FastifyReply, FastifyRequest } from "fastify";

export async function verifyJWT(request: FastifyRequest, reply: FastifyReply) {
    try {
        console.log(request.headers);

        await request.jwtVerify()
        if(!request.user.hierarchy){
            throw new Error()
        }
    } catch (err) {
        console.log(request.headers);
        
        return reply.status(401).send( {message: "Unathorized"} )
    }
}