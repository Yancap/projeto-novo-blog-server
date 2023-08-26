import { CategoriesRepository } from '../../repository/interfaces/interface-categories-repository';
import { hash } from "bcryptjs"
import { EmailAlreadyExistsError } from "../../utils/errors/email-already-exists-error";
import { CategoryAlreadyExistsError } from '../../utils/errors/category-already-exists';

interface IGetCategoryByIdService{
    category_id: string;
}

export class GetCategoryByIdService {
    constructor(private categoriesRepository: CategoriesRepository) { }
    async handler({category_id}: IGetCategoryByIdService){
        const category = await this.categoriesRepository.findById(category_id);
        if (!category) {
            return null
        }
        return category
    }
}