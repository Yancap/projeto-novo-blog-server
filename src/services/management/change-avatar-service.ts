import { compare, hash } from "bcryptjs"
import { ManagementRepository } from '../../repository/interfaces/interface-management-repository';
import { sign } from 'jsonwebtoken'
import { jwtConfig } from "../../config/jwt-config";
import { InvalidCredentialsError } from "../../utils/errors/invalid-credentials-error";
import { OperationNotPerformedError } from '../../utils/errors/operation-not-performed-error';

interface IChangeAvatarService{
    id: string;
    avatar: string;
}

export class ChangeAvatarService {
    constructor(private managementRepository: ManagementRepository) { }
    async handler({ id, avatar }: IChangeAvatarService){
        
        const isChanged = await this.managementRepository.changeAvatar({id, avatar});
        if (!isChanged) {
            throw new OperationNotPerformedError()
        }
        
        return { isChanged }
        
    }
}