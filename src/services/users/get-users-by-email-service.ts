import { hash } from "bcryptjs"
import { EmailAlreadyExistsError } from "../../utils/errors/email-already-exists-error";
import { UsersRepository } from "../../repository/interfaces/interface-users-repository";

interface IGetUsersByEmailService{
    email: string;
}

export class GetUsersByEmailService {
    constructor(private usersRepository: UsersRepository) { }
    async handler({ email }: IGetUsersByEmailService){
        const userWithSomeEmail = await this.usersRepository.findByEmail(email)
        return userWithSomeEmail
        
    }
}