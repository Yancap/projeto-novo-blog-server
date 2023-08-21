import fastify from "fastify";
import { ZodError, z } from 'zod'
import { routes } from "./routes";
import fastifyJwt from "@fastify/jwt";
import { env } from "./env";

export const app = fastify();

app.register(fastifyJwt, {
    secret: env.JWT_SECRET
})

app.register(routes)

app.setErrorHandler((error, _, reply) => {
    if(error instanceof ZodError){
        return reply.status(400).send({ message: "Validation error", issues: error.format()})
    }

    if(env.NODE_ENV !== 'production') {
        console.error(error)
    }

    return reply.status(500).send({ message:"Internal Server Error" })
})