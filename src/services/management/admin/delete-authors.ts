import { ManagementRepository } from '../../../repository/interfaces/interface-management-repository';

interface IDeleteAuthorsService{
    id: string;
}

export class DeleteAuthorsService {
    constructor(private managementRepository: ManagementRepository) { }
    async handler({ id }: IDeleteAuthorsService){
        const authors = await this.managementRepository.deleteById(id)
        if(!authors){
            throw new Error()
        }
        const isAuthorExist = authors.find(a => a.id === id)
        if (isAuthorExist){ 
            return false
        }
        return true
    }
}