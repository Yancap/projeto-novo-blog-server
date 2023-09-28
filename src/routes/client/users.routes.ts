import { FastifyInstance } from "fastify"
import { userRegister } from "../../controller/client/users/handler-users-register"
import { userGetByEmail } from "../../controller/client/users/handler-users-get-by-email"

export async function usersRoutes(app: FastifyInstance) {
    app.post('/', userRegister) 
    app.get('/:email', userGetByEmail) 
}