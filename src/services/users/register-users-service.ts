import { hash } from "bcryptjs"
import { EmailAlreadyExistsError } from "../../utils/errors/email-already-exists-error";
import { UsersRepository } from "../../repository/interfaces/interface-users-repository";

interface IRegisterUsersService{
    name: string;
    email: string;
    avatar?: string;
}

export class RegisterUsersService {
    constructor(private usersRepository: UsersRepository) { }
    async handler({name, email, avatar}: IRegisterUsersService){

        const userWithSomeEmail = await this.usersRepository.findByEmail(email)
        if(userWithSomeEmail){
           return userWithSomeEmail
        }
        const user = await this.usersRepository.register({name, email, avatar: avatar ?? ''})
        return user
        
    }
}