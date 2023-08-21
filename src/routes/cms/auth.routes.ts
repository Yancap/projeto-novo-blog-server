import { FastifyInstance } from "fastify"
import { login } from "../../controller/cms/auth/autenticate"
import { profile } from "../../controller/cms/profile"
import { verifyJWT } from "../../middlewares/verify-jwt"
import { deleteAuthors } from "../../controller/cms/admin/delete-authors"
import { verifyAdminJWT } from "../../middlewares/verify-admin-jwt"
import { register } from "../../controller/cms/admin/register"

export async function authRoutes(app: FastifyInstance) {
    app.post('/sessions', login)

    // Authentication JWT
    app.get('/profile', {onRequest: [verifyJWT]} ,profile)

    // Admin routes
    app.post('/admin/register',  register)

    app.delete('/admin/delete-authors', {onRequest: [verifyAdminJWT]},deleteAuthors)
}