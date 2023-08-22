export class AuthorDoesntExistError  extends Error {
    constructor(){
        super("Author to delete does not exist.")
    }
}