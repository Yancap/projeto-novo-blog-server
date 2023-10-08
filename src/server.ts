import { app } from './app';
import { env } from './env';
import 'dotenv/config'

const port = Number(process.env.PORT) || 3333

app.listen({
    port: port,
    host: '0.0.0.0'

}).then(() => {
    console.log("HTTP server running on PORT", port);
})

