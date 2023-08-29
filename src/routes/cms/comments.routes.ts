import { FastifyInstance } from "fastify"
import { commentsGetArticlesComments } from "../../controller/cms/comments/comments-get-articles-comments"
import { commentsManagerDelete } from "../../controller/cms/comments/comments-manager-delete"
import { verifyJWT } from "../../middlewares/verify-jwt"

export async function commentsRoutes(app: FastifyInstance) {
    app.post('/get-for-articles', commentsGetArticlesComments) 
    app.delete('/manager-delete', {onRequest: [verifyJWT]}, commentsManagerDelete) 

}