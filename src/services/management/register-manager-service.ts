import { hash } from "bcryptjs"
import { ManagementRepository } from '../../repository/interfaces/interface-management-repository';
import { EmailAlreadyExistsError } from "../../utils/errors/email-already-exists-error";

interface IRegisterManagerService{
    name: string;
    email: string;
    password: string;
}

export class RegisterManagerService {
    constructor(private managementRepository: ManagementRepository) { }
    async handler({name, email, password}: IRegisterManagerService){
        const password_hash = await hash(password, 6)

        const managerWithSomeEmail = await this.managementRepository.findByEmail(email)
        if(managerWithSomeEmail){
            throw new EmailAlreadyExistsError()
        }
        const manager = this.managementRepository.register({name, email, password: password_hash})
        return manager
        
    }
}