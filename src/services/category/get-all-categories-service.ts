import { CategoriesRepository } from '../../repository/interfaces/interface-categories-repository';
import { hash } from "bcryptjs"
import { EmailAlreadyExistsError } from "../../utils/errors/email-already-exists-error";
import { CategoryAlreadyExistsError } from '../../utils/errors/category-already-exists';



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