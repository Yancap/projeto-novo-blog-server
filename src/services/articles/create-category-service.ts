import { CategoriesRepository } from '../../repository/interfaces/interface-categories-repository';
import { hash } from "bcryptjs"
import { EmailAlreadyExistsError } from "../../utils/errors/email-already-exists-error";

interface ICreateCategoryService{
    category: string;
}

export class CreateCategoryService {
    constructor(private CategoriesRepository: CategoriesRepository) { }
    async handler({category}: ICreateCategoryService){
        const isCategoryExist = await this.CategoriesRepository.findCategory(category);
        if (isCategoryExist) {
            throw new Error()
        }
        const categories = await this.CategoriesRepository.create({category})
        return categories
    }
}