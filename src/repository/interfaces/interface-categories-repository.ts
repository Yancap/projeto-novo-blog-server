import { Categories, Prisma} from "@prisma/client";

export interface CategoriesRepository {
    create(data: Prisma.CategoriesCreateInput): Promise<Categories>
    findCategory(name: string): Promise<Categories | null>
    findById(id: string): Promise<Categories | null>
    getAllCategories(): Promise<Categories[] >
}