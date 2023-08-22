import { ManagementRepository } from '../../../repository/interfaces/interface-management-repository';
import { OnlyAdminError } from '../../../utils/errors/only-admin-error';

interface IDeleteAuthorsService{
    author_id: string;
}

export class DeleteAuthorsService {
    constructor(private managementRepository: ManagementRepository) { }
    async handler({ author_id }: IDeleteAuthorsService){
        const authors = await this.managementRepository.deleteById(author_id)
        if(authors) {
            const isAuthorExist = authors.id === author_id
            if (!isAuthorExist){ 
                return false
            }
            return true  
        }
    }
}