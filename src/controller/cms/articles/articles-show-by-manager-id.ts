import { FastifyReply, FastifyRequest } from "fastify"
import { ResourceNotFoundError } from "../../../utils/errors/resource-not-found-error"
import { makeUpdateArticlesService } from "../../../factory/articles/make-update-articles-service"
import { makeShowArticlesByManagerIdService } from "../../../factory/articles/make-show-articles-by-manager-id-service"
import { JWTVerifyReturn } from "./jwt"
import { makeGetCategoryByIdService } from "../../../factory/category/make-get-category-by-id-service"


export async function articlesShowByManagerId (request: FastifyRequest, reply: FastifyReply) {
    
    const {sub}: JWTVerifyReturn = await request.jwtVerify()
    const showArticlesByManagerIdService = makeShowArticlesByManagerIdService()
    const getCategoryById = makeGetCategoryByIdService()
    try {
        const articlesManager = await showArticlesByManagerIdService.handler({ manager_id: sub })
        const articles = await articlesManager.map(async article => {
            const category = await getCategoryById.handler({category_id: article.category_id})
            
            return await {
                ...article,
                category: category?.category
            }
        })

        
        return reply.status(200).send({ articles })    
    } catch (error) {
        if (error instanceof ResourceNotFoundError) {
            return reply.status(404).send({message: error.message})
        }
        return reply.status(500).send({error})
    }
    
}