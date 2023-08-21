import '@fastify/jwt'

declare module '@fastify/jwt' {
    interface FastifyJWT {
        payload: { hierarchy: string }
        user: {
            sub: string
            hierarchy: string
        }
    }
}