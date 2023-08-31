import { FastifyReply, FastifyRequest } from "fastify"
import { z } from "zod"
import { ResourceNotFoundError } from "../../../utils/errors/resource-not-found-error"
import { makeCreateTagsService } from "../../../factory/tags/make-create-tag-service"
import { makeCreateArticlesTagsSService } from "../../../factory/articles-tags/make-create-articles-tags-service"
import { makeCreateCreditsService } from "../../../factory/credits/make-create-credits-service"
import { makeUpdateArticlesService } from "../../../factory/articles/make-update-articles-service"
import { JWTVerifyReturn } from "./jwt"


export async function articlesUpdate (request: FastifyRequest, reply: FastifyReply) {
    //Adicionar as Tags, sua relação e os créditos
    const registerBodySchema = z.object({
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
    const {sub}: JWTVerifyReturn = await request.jwtVerify()
    
    const {article, tags, credits} = registerBodySchema.parse(request.body)

    const createCreditsService = makeCreateCreditsService()
    const createTagsService = makeCreateTagsService()
    const createArticlesTagsService = makeCreateArticlesTagsSService()
    const updateArticlesService = makeUpdateArticlesService()

    try {
        const articleUpdated = await updateArticlesService.handler({...article, manager_id: sub})
        
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
            return reply.status(404).send({message: error.message})
        }
        return reply.status(500).send({error})
    }
    

    
    
}