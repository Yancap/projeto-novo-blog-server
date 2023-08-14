import { ManagementRepository } from '../../repository/interfaces/interface-management-repository';
import { jwtConfig } from "../../config/jwt-config";
import { InvalidCredentialsError } from "../../utils/errors/invalid-credentials-error";
import { verify } from 'jsonwebtoken';
import { InvalidTokenError } from '../../utils/errors/invalid-token-error';

interface ILoginTokenValidationService{
    token: string;
}

export class LoginTokenValidationService {
    constructor() { }
    async handler({ token }: ILoginTokenValidationService){
        try {
            const { secret } = jwtConfig
            const {sub: id} = verify(token, secret)
            return { token, id }
        } catch (error) {
            throw new InvalidTokenError()
        }
        
    }
}