import { FastifyInstance } from "fastify";
import { authRoutes } from "./auth.routes";

export async function cmsRoutes(app: FastifyInstance){
    app.register(authRoutes)
}