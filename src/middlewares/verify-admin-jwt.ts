import { FastifyReply, FastifyRequest } from "fastify";

export async function verifyAdminJWT(request: FastifyRequest, reply: FastifyReply) {
    try {
        await request.jwtVerify()
        if(request.user.hierarchy !== "admin"){
            throw new Error()
        }
    } catch (err) {
        return reply.status(401).send( {message: "Unathorized"} )
    }
}