import { compare, hash } from "bcryptjs"
import { ManagementRepository } from '../../repository/interfaces/interface-management-repository';
import { sign } from 'jsonwebtoken'
import { jwtConfig } from "../../config/jwt-config";
import { InvalidCredentialsError } from "../../utils/errors/invalid-credentials-error";

interface ILoginManagerService{
    email: string;
    password: string;
}

export class LoginManagerService {
    constructor(private managementRepository: ManagementRepository) { }
    async handler({ email, password }: ILoginManagerService){
        
        const manager = await this.managementRepository.findByEmail(email);
        if (!manager) {
            throw new InvalidCredentialsError()
        }
        
        const isPasswordCorrect = await compare(password, manager.password)
        if (!isPasswordCorrect) {
            throw new InvalidCredentialsError()
        }
        
        return { manager }
        
    }
}