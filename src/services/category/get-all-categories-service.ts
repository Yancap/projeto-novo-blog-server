import { CategoriesRepository } from '../../repository/interfaces/interface-categories-repository';

export class GetAllCategoriesService {
    constructor(private categoriesRepository: CategoriesRepository) { }
    async handler(){
        const categories = await this.categoriesRepository.getAllCategories();
        if (!categories) {
            return null
        }
        return categories
    }
}