import { FastifyInstance } from "fastify"
import { userRegister } from "../../controller/client/users/users-register"
import { userGetByEmail } from "../../controller/client/users/users-get-by-email"

export async function usersRoutes(app: FastifyInstance) {
    app.post('/', userRegister) 
    app.post('/get-by-email', userGetByEmail) 
}