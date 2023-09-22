import { FastifyReply, FastifyRequest } from "fastify"
import { z, ZodError } from "zod"
import { ResourceNotFoundError } from "../../../utils/errors/resource-not-found-error"
import { makeCreateArticlesService } from "../../../factory/articles/make-create-articles-service"
import { makeCreateTagsService } from "../../../factory/tags/make-create-tag-service"
import { makeCreateArticlesTagsSService } from "../../../factory/articles-tags/make-create-articles-tags-service"
import { makeCreateCreditsService } from "../../../factory/credits/make-create-credits-service"
import { JWTVerifyReturn } from "./jwt"

export async function articlesCreate (request: FastifyRequest, reply: FastifyReply) {
    //Adicionar as Tags, sua relação e os créditos
    const registerBodySchema = z.object({
        article: z.object({
            title: z.string(),
            subtitle: z.string(),
            text: z.string(),
            image: z.string(),
            created_at: z.optional(z.string()),
            state: z.optional(z.string()),
            category: z.string(),
        }),
        tags: z.array(
            z.object({ name: z.string()})
        ),
        credits: z.array(
            z.object({ name: z.string(), link: z.string() })
        )
    })
    
    const {sub}: JWTVerifyReturn = await request.jwtVerify()
    
    const createArticlesService = makeCreateArticlesService()
    const createCreditsService = makeCreateCreditsService()
    const createTagsService = makeCreateTagsService()
    const createArticlesTagsService = makeCreateArticlesTagsSService()

    //services de criação de tags e credits
    try {
        const {article, tags, credits} = registerBodySchema.parse(request.body)
        const articleCreated = await createArticlesService.handler({...article, manager_id: sub})

        credits.forEach( async credit => await createCreditsService.handler({
            article_id: articleCreated.id,
            name: credit.name,
            link: credit.link
        }))
        
        const tagsCreated = tags.map( async tag => await createTagsService.handler({ 
            name: tag.name 
        }))
        
        tagsCreated.map( async tag => {
            const tagAsync = await tag
            if(tagAsync) {
                await createArticlesTagsService.handler({ 
                    tag_id: tagAsync.id,
                    article_id:  articleCreated.id
                })
            }
        })

        return reply.status(200).send({article: articleCreated}) 
        
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