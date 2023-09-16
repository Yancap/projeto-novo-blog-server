import { FastifyInstance } from "fastify"
import { verifyAdminJWT } from "../../middlewares/verify-admin-jwt"
import { AdminController } from "../../controller/cms/admin/admin-controller"

export async function adminRoutes(app: FastifyInstance) {
    const adminController = new AdminController()
    app.get('/get-authors', {onRequest: [verifyAdminJWT]}, adminController.getAuthors) // certo
    app.get('/get-all-articles', {onRequest: [verifyAdminJWT]}, adminController.getAllArticles) // Certo
    app.post('/register', {onRequest: [verifyAdminJWT]}, adminController.registerManager) // certo
    app.delete('/delete-authors', {onRequest: [verifyAdminJWT]}, adminController.deleteAuthors) // certo
    app.delete('/delete-articles', {onRequest: [verifyAdminJWT]}, adminController.getAllArticles) // certo

}