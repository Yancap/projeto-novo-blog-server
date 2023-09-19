const { PrismaClient } = require("@prisma/client");
const { randomUUID } = require("crypto");
const {execSync} = require("node:child_process")
const fs = require('fs-extra');
const path = require("path");
require('dotenv/config')


const prisma = new PrismaClient()

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
        const databaseURL = generateDatabaseURL(uid)
        process.env.DATABASE_TEST_URL = databaseURL
        execSync('npx prisma migrate deploy')
        return {
            async teardown() {
                const pathDbTest = path.join(__dirname, "../test")
                try {
                   fs.remove(pathDbTest, err => console.log(err)) 
                } catch (error) {
                    
                }
            }
        }
    }
}