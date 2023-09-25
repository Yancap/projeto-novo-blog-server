import { FastifyReply, FastifyRequest } from "fastify"
import { ZodError, z } from "zod"
import { ResourceNotFoundError } from "../../../utils/errors/resource-not-found-error"
import { makeCreateTagsService } from "../../../factory/tags/make-create-tag-service"
import { makeCreateArticlesTagsSService } from "../../../factory/articles-tags/make-create-articles-tags-service"
import { makeCreateCreditsService } from "../../../factory/credits/make-create-credits-service"
import { makeUpdateArticlesService } from "../../../factory/articles/make-update-articles-service"
import { JWTVerifyReturn } from "./jwt"


export async function articlesUpdate (request: FastifyRequest, reply: FastifyReply) {
    //Adicionar as Tags, sua relação e os créditos
    const updateBodySchema = z.object({
        article: z.object({
            id: z.string(),
            title: z.string(),
            subtitle: z.string(),
            text: z.string(),
            image: z.string(),
            created_at: z.optional(z.string()),
            state: z.string(),
            category: z.string(),
        }),
        tags: z.array(z.object({ name: z.string()}
        )),
        credits: z.array(z.object({ name: z.string(), link: z.string() }))
    })
    const idParamsSchema =  z.object({
        id: z.string()
    })

    const {sub}: JWTVerifyReturn = await request.jwtVerify()

    const createCreditsService = makeCreateCreditsService()
    const createTagsService = makeCreateTagsService()
    const createArticlesTagsService = makeCreateArticlesTagsSService()
    const updateArticlesService = makeUpdateArticlesService()

    try {
        const {article, tags, credits} = updateBodySchema.parse(request.body)
        const {id} = idParamsSchema.parse(request.params)

        const articleUpdated = await updateArticlesService.handler({...article, id:id, manager_id: sub})
        
        credits.forEach( async credit => await createCreditsService.handler({
            article_id: articleUpdated.id,
            name: credit.name,
            link: credit.link
        }))
        
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
         
        return reply.status(200).send({article: articleUpdated})    
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
        return reply.status(500).send({error})
    }
    

    
    
}