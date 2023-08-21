import { ManagementRepository } from '../../../repository/interfaces/interface-management-repository';
import { OnlyAdminError } from '../../../utils/errors/only-admin-error';

interface IDeleteAuthorsService{
    author_id: string;
    admin_id: string;
}

export class DeleteAuthorsService {
    constructor(private managementRepository: ManagementRepository) { }
    async handler({ author_id, admin_id }: IDeleteAuthorsService){

        const admin = await this.managementRepository.findById(admin_id)
        if (!admin || admin.hierarchy !== "admin") {
            throw new OnlyAdminError()
        }

        const authors = await this.managementRepository.deleteById(author_id)
        if(!authors){
            throw new Error()
        }

        const isAuthorExist = authors.id === author_id
        if (!isAuthorExist){ 
            return false
        }
        return true
    }
}