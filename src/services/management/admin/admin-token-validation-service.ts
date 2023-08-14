import { InvalidTokenError } from '../../../utils/errors/invalid-token-error';
import { jwtConfig } from './../../../config/jwt-config';
import { verify } from 'jsonwebtoken';

interface IAdminTokenValidationService{
    token: string;
}

export class AdminTokenValidationService {
    constructor() { }
    async handler({ token }: IAdminTokenValidationService){
        try {
            const { secret } = jwtConfig
            const {sub: id} = verify(token, secret, { subject: "admin" })
            return { token, id }
        } catch (error) {
            throw new InvalidTokenError()
        }
        
    }
}