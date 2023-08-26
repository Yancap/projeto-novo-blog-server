import { ArticlesRepository } from '../../../repository/interfaces/interface-articles-repository';
import { ManagementRepository } from '../../../repository/interfaces/interface-management-repository';
import { OnlyAdminError } from '../../../utils/errors/only-admin-error';



export class AdminGetAllArticlesService {
    constructor(
        private articlesRepository: ArticlesRepository
    ) { }
    async handler(){
        const articles = await this.articlesRepository.showAll()
        if (!articles) {
            return null
        }
        return articles
    }
}