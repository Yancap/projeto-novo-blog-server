import { FastifyInstance } from "fastify"
import { adminDeleteAuthors } from "../../controller/cms/admin/admin-delete-authors"
import { verifyAdminJWT } from "../../middlewares/verify-admin-jwt"
import { adminRegister } from "../../controller/cms/admin/admin-register"
import { verifyJWT } from "../../middlewares/verify-jwt"

export async function articlesRoutes(app: FastifyInstance) {
    // Article routes
    /*
        Criar, Editar, Excluir, Rascunhar, Desativar e Ver
    */
    app.get('/show', {onRequest: [verifyJWT]},() => {})
    app.post('/create', {onRequest: [verifyJWT]},() => {})
    app.put('/update', {onRequest: [verifyJWT]},() => {})
    app.patch('/draft', {onRequest: [verifyJWT]},() => {})
    app.patch('/deactive', {onRequest: [verifyJWT]},() => {})
    app.post('/delete', {onRequest: [verifyJWT]},() => {})
}