import { app } from './app';
import { env } from './env';
import 'dotenv/config'

const port = Number(process.env.PORT) || 3333
const host = env.NODE_ENV === "development" ? 'localhost' : '0.0.0.0'
app.listen({
    port: port,
    host: host
}).then(() => {
    console.log("HTTP server running on PORT", port);
})

