export class InvalidTokenError extends Error {
    constructor(){
        super("Token expired or invalid")
    }
}