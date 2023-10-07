const { randomUUID } = require("crypto");
const {execSync} = require("node:child_process")
require('dotenv/config')


function generateDatabaseURL(uid){
    if (!process.env.DATABASE_URL) throw new Error("Please provide a DATABASE_URL environment variable ")
    const url = `file:./test/test-${uid}.db`
    return url
}

module.exports = {
    transformMode: "web",
    name: 'prisma',
    async setup(){
        const uid = randomUUID().substring(0,6);
        const databaseURL = generateDatabaseURL(uid)
        process.env.DATABASE_URL = databaseURL
        execSync('npx prisma migrate deploy')
        return {
            async teardown() {},

        }
    }
}