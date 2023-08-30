import { FastifyReply, FastifyRequest } from "fastify"
import { ResourceNotFoundError } from "../../../utils/errors/resource-not-found-error"
import { z } from "zod"
import { makeGetCreditsByArticleIdService } from "../../../factory/credits/make-get-credits-by-article-id-service"


export async function creditsGetByArticleId (request: FastifyRequest, reply: FastifyReply) {
    const registerBodySchema = z.object({
        article_id: z.string()
    })

    const { article_id } = registerBodySchema.parse(request.body)

    const getCreditsByArticleIdService = makeGetCreditsByArticleIdService()
    try {
        const credits = await getCreditsByArticleIdService.handler({article_id})
        
        if (credits) {
            return reply.status(200).send({credits})    
        }
        return reply.status(200).send(null)  
    } catch (error) {
        if (error instanceof ResourceNotFoundError) {
            return reply.status(404).send({message: error.message})
        }
        return reply.status(500).send({error})
    }
}