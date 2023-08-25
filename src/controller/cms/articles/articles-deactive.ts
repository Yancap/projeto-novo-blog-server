import { FastifyReply, FastifyRequest } from "fastify"
import { z } from "zod"
import { makeDeleteArticlesService } from "../../../factory/management/admin/make-delete-articles-services"
import { ResourceNotFoundError } from "../../../utils/errors/resource-not-found-error"
import { makeCreateArticlesService } from "../../../factory/articles/make-create-articles-service"
import { makeCreateTagsService } from "../../../factory/tags/make-create-tag-service"
import { makeCreateArticlesTagsSService } from "../../../factory/articles-tags/make-create-articles-tags-service"
import { makeCreateCreditsService } from "../../../factory/credits/make-create-credits-service"
import { makeUpdateArticlesService } from "../../../factory/articles/make-update-articles-service"
import { JWTVerifyReturn } from "./jwt"


export async function articlesDeactive (request: FastifyRequest, reply: FastifyReply) {
    //Adicionar as Tags, sua relação e os créditos
    
    const registerBodySchema = z.object({
        id: z.string()
    })
    const {sub}: JWTVerifyReturn = await request.jwtVerify()
    const {id} = registerBodySchema.parse(request.body)
    const updateArticlesService = makeUpdateArticlesService()
    try {
        const articleUpdated = await updateArticlesService.handler({ id: id, state: "inactive", manager_id: sub })
        return reply.status(200).send({article: articleUpdated})    
    } catch (error) {
        if (error instanceof ResourceNotFoundError) {
            return reply.status(404).send({message: error.message})
        }
        return reply.status(500).send({error})
    }
    

    
    
}