import { FastifyReply, FastifyRequest } from "fastify";
import { JWTVerifyReturn } from "../controller/cms/articles/jwt";

export async function verifyAdminJWT(request: FastifyRequest, reply: FastifyReply) {
    try {
        await request.jwtVerify()
        if(request.user.hierarchy !== "admin"){
            return reply.status(401).send( { message: "Unathorized" } )
        }
    } catch (err) {
        return reply.status(401).send( { message: "Unathorized" } )
    }
}