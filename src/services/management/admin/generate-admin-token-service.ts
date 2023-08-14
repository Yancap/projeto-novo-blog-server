import { jwtConfig } from './../../../config/jwt-config';
import { sign } from 'jsonwebtoken';

interface IGenerateAdminTokenService{
    hierarchy: string;
}

export class GenerateAdminTokenService {
    constructor() { }
    async handler({ hierarchy }: IGenerateAdminTokenService){
        if (hierarchy !== "admin") {
            throw new Error()
        }
        
        
        const { secret, expiresIn } = jwtConfig
        const admin_token = sign({}, secret, {
            subject: hierarchy,
            expiresIn
        })
        
        return { admin_token }
        
    }
}