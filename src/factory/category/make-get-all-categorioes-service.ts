import { PrismaCategoriesRepository } from "../../repository/prisma/prisma-categories"
import { GetAllCategoriesService } from "../../services/category/get-all-categories-service"

export function makeGetAllCategorieservice(){
    const getAllCategorieservice = new GetAllCategoriesService(
        new PrismaCategoriesRepository
    )
    return getAllCategorieservice
}