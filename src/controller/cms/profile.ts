import { FastifyReply, FastifyRequest } from "fastify"


export async function profile (request: FastifyRequest, reply: FastifyReply) {
    const token = await request.jwtVerify()
    console.log(token);
    
    return reply.status(200).send({message: "success"})
}