import { FastifyInstance } from "fastify"
import { commentsCreate } from "../../controller/client/comments/comments-create"
import { verifyUserJWT } from "../../middlewares/verify-user-jwt"
import { commentsGetArticlesComments } from "../../controller/cms/comments/comments-get-articles-comments"

export async function commentsRoutes(app: FastifyInstance) {
    app.post('/', {onRequest: [verifyUserJWT]}, commentsCreate)
    app.post('/get-article-comments',  commentsGetArticlesComments)     
     
}