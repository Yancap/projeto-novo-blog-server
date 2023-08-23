import { CategoriesRepository } from '../../repository/interfaces/interface-categories-repository';
import { hash } from "bcryptjs"
import { EmailAlreadyExistsError } from "../../utils/errors/email-already-exists-error";
import { CategoryAlreadyExistsError } from '../../utils/errors/category-already-exists';

interface ICreateCategoryService{
    category: string;
}

export class CreateCategoryService {
    constructor(private categoriesRepository: CategoriesRepository) { }
    async handler({category}: ICreateCategoryService){
        const isCategoryExist = await this.categoriesRepository.findCategory(category);
        if (isCategoryExist) {
            throw new CategoryAlreadyExistsError()
        }
        const categories = await this.categoriesRepository.create({category})
        return categories
    }
}