import { FastifyInstance } from "fastify"
import { adminDeleteAuthors } from "../../controller/cms/admin/admin-delete-authors"
import { verifyAdminJWT } from "../../middlewares/verify-admin-jwt"
import { adminRegister } from "../../controller/cms/admin/admin-register"

export async function articlesRoutes(app: FastifyInstance) {
    // Article routes
    /*
        Criar, Editar, Excluir, Rascunhar, Desativar e Ver
    */
    app.get('/show',  () => {})
    app.post('/create',  () => {})
    app.put('/update',  () => {})
    app.patch('/draft',  () => {})
    app.patch('/deactive',  () => {})
    app.post('/delete',  () => {})
}