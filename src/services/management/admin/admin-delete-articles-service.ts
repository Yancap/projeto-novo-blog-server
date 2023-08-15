import { ArticlesRepository } from '../../../repository/interfaces/interface-articles-repository';
import { ManagementRepository } from '../../../repository/interfaces/interface-management-repository';
import { OnlyAdminError } from '../../../utils/errors/only-admin-error';

interface IAdminDeleteArticlesService{
    admin_id: string;
    article_id: string;
}

export class AdminDeleteArticlesService {
    constructor(
        private managementRepository: ManagementRepository,
        private articlesRepository: ArticlesRepository
    ) { }
    async handler({ admin_id, article_id }: IAdminDeleteArticlesService){
        const admin = await this.managementRepository.findById(admin_id)
        if(!admin || admin.hierarchy !== "admin"){
            throw new OnlyAdminError()
        }
        
        const articles = await this.articlesRepository.delete(article_id)
        const isArticlesExist = articles?.find(article => article.id === article_id)
        if (isArticlesExist) {
            return false
        }
        return true
    }
}