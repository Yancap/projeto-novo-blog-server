import { FastifyReply, FastifyRequest } from "fastify"
import { z, ZodError } from "zod"
import { ResourceNotFoundError } from "../../../utils/errors/resource-not-found-error"
import { makeCreateArticlesService } from "../../../factory/articles/make-create-articles-service"
import { makeCreateTagsService } from "../../../factory/tags/make-create-tag-service"
import { makeCreateArticlesTagsSService } from "../../../factory/articles-tags/make-create-articles-tags-service"
import { makeCreateCreditsService } from "../../../factory/credits/make-create-credits-service"
import { makeUpdateArticlesService } from "../../../factory/articles/make-update-articles-service"
import { JWTVerifyReturn } from "./jwt"
import { ForbiddenOperationError } from "../../../utils/errors/forbidden-operation-error"


export async function articlesDraftWithArticleId (request: FastifyRequest, reply: FastifyReply) {
    //Adicionar as Tags, sua relação e os créditos
    const draftBodySchema = z.object({
        article: z.object({
            title: z.optional(z.string()),
            subtitle: z.optional(z.string()),
            text: z.optional(z.string()),
            image: z.optional(z.string()),
            created_at: z.optional(z.string()),
            state: z.string(),
            category: z.string(),
        }),
        tags: z.nullable(z.array(
            z.object({ name: z.string()})
        )),
        credits: z.nullable(z.array(
            z.object({ name: z.string(), link: z.string() })
        ))
    })
    const paramsSchema = z.object({
        id: z.string().nonempty()
    })
    const {sub}: JWTVerifyReturn = await request.jwtVerify()
    try {
        const {article, tags, credits} = draftBodySchema.parse(request.body)
        const { id } = paramsSchema.parse(request.params)
        const createCreditsService = makeCreateCreditsService()
        const createTagsService = makeCreateTagsService()
        const createArticlesTagsService = makeCreateArticlesTagsSService()
        
        const updateArticlesService = makeUpdateArticlesService()  
        const articleUpdated = await updateArticlesService.handler({...article, id, manager_id: sub})
        if(credits){
            credits.forEach( async credit => await createCreditsService.handler({
                article_id: articleUpdated.id,
                name: credit.name,
                link: credit.link
            }))
        }
        
        if(tags){
            const tagsCreated = tags.map( async tag => await createTagsService.handler({ 
                name: tag.name 
            }))
            tagsCreated.map( async tag => {
                const tg = await tag
                if(tg) {
                    await createArticlesTagsService.handler({ 
                        tag_id: tg.id,
                        article_id:  articleUpdated.id
                    })
                }
            })
        }   
        return reply.status(200).send({ article: articleUpdated })    
    
    } catch (error) {
        if (error instanceof ResourceNotFoundError) {
            return reply.status(404).send({
                error: "ResourceNotFoundError",
                message: error.message
            })
        }
        if (error instanceof ZodError) {
            return reply.status(400).send({
                error: "ValidationRequestError",
                message: "Missing mandatory router parameters"
            })
        }
        if(error instanceof ForbiddenOperationError) {
            return reply.status(404).send({
                error: "ForbiddenOperationError",
                message: error.message
            })
        }
        return reply.status(500).send({error})
    }


}

