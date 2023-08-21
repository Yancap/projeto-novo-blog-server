import { FastifyReply, FastifyRequest } from "fastify"


export async function deleteAuthors (request: FastifyRequest, reply: FastifyReply) {
    
    return reply.status(200).send({})
}