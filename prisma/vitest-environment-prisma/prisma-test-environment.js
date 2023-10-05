const { randomUUID } = require("crypto");
const {execSync} = require("node:child_process")
require('dotenv/config')


function generateDatabaseURL(uid){
    if (!process.env.DATABASE_TEST_URL) throw new Error("Please provide a DATABASE_TEST_URL environment variable ")
    const url = process.env.DATABASE_TEST_URL.toString("").replace("test.db", `test-${uid}.db`)
    return url
}

module.exports = {
    transformMode: "web",
    name: 'prisma',
    async setup(){
        const uid = randomUUID().substring(0,6);
        process.env.DATABASE_URL = `file:./test/test-${uid}.db`
        execSync('npx prisma migrate deploy')
        return {
            async teardown() {},

        }
    }
}