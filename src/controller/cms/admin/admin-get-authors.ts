import { FastifyReply, FastifyRequest } from "fastify"
import { makeDeleteAuthorsService } from "../../../factory/management/admin/make-delete-authors-service"
import { z } from "zod"
import { AuthorDoesntExistError } from "../../../utils/errors/admin/author-doesnt-exist-error"
import { makeGetAuthorsServices } from "../../../factory/management/admin/make-get-authors-services"


export async function adminGetAuthors (request: FastifyRequest, reply: FastifyReply) {
    
    const getAuthorsService = makeGetAuthorsServices()
    try {
        const authors = await getAuthorsService.handler()
        return reply.status(200).send({authors}) 
    } catch (error) {
        if (error instanceof AuthorDoesntExistError) {
            return reply.status(404).send({message: error.message})
        }
        return reply.status(500).send({error})
    }
    
}