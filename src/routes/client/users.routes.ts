import { FastifyInstance } from "fastify"
import { userRegister } from "../../controller/client/users/users-register"

export async function usersRoutes(app: FastifyInstance) {
    app.post('/', userRegister) 
    
}