export class ForbiddenOperationError extends Error {
    constructor(){
        super("You are not allowed to perform this operation.")
    }
}