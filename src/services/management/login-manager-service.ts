import { compare, hash } from "bcryptjs"
import { ManagementRepository } from '../../repository/interfaces/interface-management-repository';
import { sign } from 'jsonwebtoken'
import { jwtConfig } from "../../config/jwt-config";
import { InvalidCredentialsError } from "../../utils/errors/invalid-credentials-error";

interface ILoginManagerService{
    id?:string;
    email?: string;
    password?: string;
}

export class LoginManagerService {
    constructor(private managementRepository: ManagementRepository) { }
    async handler({ email, password, id }: ILoginManagerService){

        if(id) {
            const manager = await this.managementRepository.findById(id);
            const { secret, expiresIn } = jwtConfig
            const token = sign({}, secret, {
                subject: String(id),
                expiresIn
            })
            return { manager, token }
        }
        if(email && password){
            const manager = await this.managementRepository.findByEmail(email);
            if (!manager) {
                throw new InvalidCredentialsError()
            }
            
            const isPasswordCorrect = await compare(password, manager.password)
            if (!isPasswordCorrect) {
                throw new InvalidCredentialsError()
            }
            const { secret, expiresIn } = jwtConfig
            const token = sign({}, secret, {
                subject: String(manager.id),
                expiresIn
            })
            return { manager, token }
        }
        throw new Error("No params")
    }
}