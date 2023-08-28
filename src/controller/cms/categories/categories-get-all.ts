import { FastifyReply, FastifyRequest } from "fastify"
import { ResourceNotFoundError } from "../../../utils/errors/resource-not-found-error"
import { makeAdminGetAllArticlesService } from "../../../factory/management/admin/make-get-all-articles-services"
import { makeGetAllCategorieservice } from "../../../factory/category/make-get-all-categorioes-service"


export async function categoriesGetAll (request: FastifyRequest, reply: FastifyReply) {
    
    const getAllCategorieservice = makeGetAllCategorieservice()
    try {
        const categories = await getAllCategorieservice.handler()
        return reply.status(200).send({categories})    
    } catch (error) {
        if (error instanceof ResourceNotFoundError) {
            return reply.status(404).send({message: error.message})
        }
        return reply.status(500).send({error})
    }
}