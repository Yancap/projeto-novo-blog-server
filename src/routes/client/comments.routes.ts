import { FastifyInstance } from "fastify"
import { commentsCreate } from "../../controller/client/comments/comments-create"
import { verifyUserJWT } from "../../middlewares/verify-user-jwt"
import { commentsGetArticlesComments } from "../../controller/cms/comments/handler-comments-get-articles-comments"
import { commentsUserDelete } from "../../controller/client/comments/comments-user-delete"

export async function commentsRoutes(app: FastifyInstance) {
    app.post('/', {onRequest: [verifyUserJWT]}, commentsCreate)
    app.delete('/', {onRequest: [verifyUserJWT]}, commentsUserDelete)
    app.post('/get-article-comments',  commentsGetArticlesComments)     
     
}