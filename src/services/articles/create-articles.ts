import { ManagementRepository } from './../../repository/interfaces/interface-management-repository';
import { ArticlesRepository } from './../../repository/interfaces/interface-articles-repository';
import { CategoriesRepository } from './../../repository/interfaces/interface-categories-repository';

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
        private ArticlesRepository: ArticlesRepository,
        private CategoriesRepository: CategoriesRepository,
        private ManagementRepository: ManagementRepository,
    ) { }
    async handler({title, subtitle, text, management_id, category}: ICreateArticleService){

        let articleCategory = await this.CategoriesRepository.findCategory(category)
        if (!articleCategory) {
            articleCategory = await this.CategoriesRepository.create({category})
        }

        const manager = await this.ManagementRepository.findById(management_id)
        if (!manager) {
            throw new Error()
        }
        const article = this.ArticlesRepository.create({
            title, subtitle, text, 
            category_id: articleCategory.id,
            manager_id: manager.id
        })
        
        return article
    }
}