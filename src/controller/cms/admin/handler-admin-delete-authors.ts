import { FastifyReply, FastifyRequest } from "fastify"
import { makeDeleteAuthorsService } from "../../../factory/management/admin/make-delete-authors-service"
import { ZodError, z } from "zod"
import { AuthorDoesntExistError } from "../../../utils/errors/admin/author-doesnt-exist-error"


export async function adminDeleteAuthors (request: FastifyRequest, reply: FastifyReply) {
    const registerBodySchema = z.object({
        author_id: z.string(),
    })
    try {
        const {author_id} = registerBodySchema.parse(request.body)
        const deleteAuthorsService = makeDeleteAuthorsService()
        await deleteAuthorsService.handler({author_id})
        return reply.status(200).send({message: "success"}) 
    } catch (error) {
        if (error instanceof AuthorDoesntExistError) {
            return reply.status(404).send({message: error.message})
        }
        if (error instanceof ZodError) {
            return reply.status(400).send({message: "Required author id"})
        }
        return reply.status(500).send({error})
    }
    
}