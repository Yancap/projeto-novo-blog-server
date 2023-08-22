import { FastifyReply, FastifyRequest } from "fastify"
import { makeDeleteAuthorsService } from "../../../factory/management/admin/make-delete-authors-service"
import { z } from "zod"
import { AuthorDoesntExistError } from "../../../utils/errors/admin/author-doesnt-exist-error"


export async function adminDeleteAuthors (request: FastifyRequest, reply: FastifyReply) {
    const registerBodySchema = z.object({
        author_id: z.string(),
    })
    const {author_id} = registerBodySchema.parse(request.body)
    const deleteAuthorsService = makeDeleteAuthorsService()
    try {
        await deleteAuthorsService.handler({author_id})
        return reply.status(200).send({message: "success"}) 
    } catch (error) {
        if (error instanceof AuthorDoesntExistError) {
            return reply.status(404).send({message: error.message})
        }
        return reply.status(500).send({error})
    }
    
}