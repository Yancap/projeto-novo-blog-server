import { ManagementRepository } from '../../repository/interfaces/interface-management-repository';
import { ArticlesRepository } from '../../repository/interfaces/interface-articles-repository';
import { CategoriesRepository } from '../../repository/interfaces/interface-categories-repository';
import { ForbiddenOperationError } from '../../utils/errors/forbidden-operation-error';

interface ICreateArticleService{
    
    title: string;
    subtitle: string;
    text: string;
    image: string;
    created_at?: string;
    state?: string;
    category: string;
    manager_id: string;
    

}

export class CreateArticleService {
    constructor(
        private articlesRepository: ArticlesRepository,
        private categoriesRepository: CategoriesRepository,
        private managementRepository: ManagementRepository,
    ) { }
    async handler(data: ICreateArticleService){

        let articleCategory = await this.categoriesRepository.findCategory(data.category)
        if (!articleCategory) {
            articleCategory = await this.categoriesRepository.create({
                category: data.category.toLowerCase()
            })
        }

        const manager = await this.managementRepository.findById(data.manager_id)
        if (!manager) {
            throw new ForbiddenOperationError()
        }
        
        const article = this.articlesRepository.create({
            title: data.title, 
            subtitle: data.subtitle, 
            text: data.text, 
            image: data.image,
            state: data.state,
            created_at: new Date(),
            category_id: articleCategory.id,
            manager_id: manager.id
        })
        
        return article
    }
}