import { FastifyInstance } from "fastify"
import { adminDeleteAuthors } from "../../controller/cms/admin/admin-delete-authors"
import { verifyAdminJWT } from "../../middlewares/verify-admin-jwt"
import { adminRegister } from "../../controller/cms/admin/admin-register"
import { adminDeleteArticles } from "../../controller/cms/admin/admin-delete-articles"
import { adminGetAuthors } from "../../controller/cms/admin/admin-get-authors"

export async function adminRoutes(app: FastifyInstance) {
    // Admin routes
    app.get('/get-authors', {onRequest: [verifyAdminJWT]}, adminGetAuthors) // certo
    app.post('/register', {onRequest: [verifyAdminJWT]}, adminRegister) // certo
    app.delete('/delete-authors', {onRequest: [verifyAdminJWT]}, adminDeleteAuthors) // certo
    app.delete('/delete-articles', {onRequest: [verifyAdminJWT]}, adminDeleteArticles) // certo

}