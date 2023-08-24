import { app } from './app';
import { env } from './env';

app.listen({
    host: 'localhost',
    port: env.PORT,
}).then(() => {
    console.log("HTTP server running on PORT", env.PORT);
})

