import { FastifyInstance } from "fastify"
import { adminDeleteAuthors } from "../../controller/cms/admin/admin-delete-authors"
import { verifyAdminJWT } from "../../middlewares/verify-admin-jwt"
import { adminRegister } from "../../controller/cms/admin/admin-register"
import { adminDeleteArticles } from "../../controller/cms/admin/admin-delete-articles"

export async function adminRoutes(app: FastifyInstance) {
    // Admin routes
    app.post('/register', adminRegister)
    app.delete('/delete-authors', {onRequest: [verifyAdminJWT]}, adminDeleteAuthors)
    app.delete('/delete-articles', {onRequest: [verifyAdminJWT]}, adminDeleteArticles)

}