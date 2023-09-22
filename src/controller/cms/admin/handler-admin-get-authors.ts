import { FastifyReply, FastifyRequest } from "fastify"
import { makeDeleteAuthorsService } from "../../../factory/management/admin/make-delete-authors-service"
import { z } from "zod"
import { AuthorDoesntExistError } from "../../../utils/errors/admin/author-doesnt-exist-error"
import { makeGetAuthorsServices } from "../../../factory/management/admin/make-get-authors-services"
import { makeShowArticlesByManagerIdService } from "../../../factory/articles/make-show-articles-by-manager-id-service"


export async function adminGetAuthors (request: FastifyRequest, reply: FastifyReply) {
    
    const getAuthorsService = makeGetAuthorsServices()
    const showArticlesByManagerIdService = makeShowArticlesByManagerIdService()

    try {
        const authors = await getAuthorsService.handler()
        const authorsWithArticlesLength: any[] = []
        if (authors) {
            for(let author of authors) {
                const articlesManager = await showArticlesByManagerIdService.handler({ manager_id: author.id })
                authorsWithArticlesLength.push({
                    id: author.id,
                    name: author.name,
                    email: author.email,
                    avatar: author.avatar,
                    allArticles: articlesManager.length
                })
            }
        }

        return reply.status(200).send({authors: authorsWithArticlesLength}) 
    } catch (error) {
        if (error instanceof AuthorDoesntExistError) {
            return reply.status(404).send({
                error: "AuthorDoesntExistError",
                message: error.message
            })
        }
        return reply.status(500).send({error})
    }
    
}