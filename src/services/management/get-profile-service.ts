import { compare, hash } from "bcryptjs"
import { ManagementRepository } from '../../repository/interfaces/interface-management-repository';
import { sign } from 'jsonwebtoken'
import { jwtConfig } from "../../config/jwt-config";
import { InvalidCredentialsError } from "../../utils/errors/invalid-credentials-error";

interface IGetProfileService{
    id: string;
}

export class GetProfileService {
    constructor(private managementRepository: ManagementRepository) { }
    async handler({ id }: IGetProfileService){
        
        const manager = await this.managementRepository.findById(id);
        if (!manager) {
            throw new InvalidCredentialsError()
        }
        
        return { manager }
        
    }
}