import { ArticlesRepository } from '../../../repository/interfaces/interface-articles-repository';
import { ManagementRepository } from '../../../repository/interfaces/interface-management-repository';
import { OnlyAdminError } from '../../../utils/errors/only-admin-error';

interface IAdminDeleteArticlesService{
    article_id: string;
}

export class AdminDeleteArticlesService {
    constructor(
        private articlesRepository: ArticlesRepository
    ) { }
    async handler({ article_id }: IAdminDeleteArticlesService){
        const articles = await this.articlesRepository.deleteByAdmin({article_id})
        const isArticlesExist = articles.id === article_id
        if (!isArticlesExist) {
            return false
        }
        return true
    }
}