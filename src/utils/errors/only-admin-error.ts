export class OnlyAdminError extends Error {
    constructor(){
        super("Only admin can perform this operation")
    }
}