import { ManagementRepository } from '../../repository/interfaces/interface-management-repository';
import { ArticlesRepository } from '../../repository/interfaces/interface-articles-repository';
import { CategoriesRepository } from '../../repository/interfaces/interface-categories-repository';
import { ForbiddenOperationError } from '../../utils/errors/forbidden-operation-error';

interface ICreateArticleService{
    title: string;
    subtitle: string;
    text: string;
    created_at?: string;
    state?: string;
    category: string;
    management_id: string;
}

export class CreateArticleService {
    constructor(
        private articlesRepository: ArticlesRepository,
        private categoriesRepository: CategoriesRepository,
        private managementRepository: ManagementRepository,
    ) { }
    async handler({title, subtitle, text, management_id, category}: ICreateArticleService){

        let articleCategory = await this.categoriesRepository.findCategory(category)
        if (!articleCategory) {
            articleCategory = await this.categoriesRepository.create({category})
        }

        const manager = await this.managementRepository.findById(management_id)
        if (!manager) {
            throw new ForbiddenOperationError()
        }

        const article = this.articlesRepository.create({
            title, subtitle, text, 
            category_id: articleCategory.id,
            manager_id: manager.id
        })
        
        return article
    }
}