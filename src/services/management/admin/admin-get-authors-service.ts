import { ManagementRepository } from '../../../repository/interfaces/interface-management-repository';

export class AdminGetAuthorsService {
    constructor(
        private managementRapository: ManagementRepository
    ) { }
    async handler(){
        const authors = await this.managementRapository.findAuthors()
        if (!authors) {
            return null
        }
        return authors
    }
}