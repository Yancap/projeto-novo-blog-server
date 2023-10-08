import { app } from './app';
import { env } from './env';
import 'dotenv/config'

const port = process.env.PORT ? Number(process.env.PORT) : env.PORT

app.listen({
    host: 'localhost',
    port: port,
}).then(() => {
    console.log("HTTP server running on PORT", env.PORT);
})

