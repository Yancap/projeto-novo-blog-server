import { Categories, Prisma} from "@prisma/client";

export interface CategoriesRepository {
    create(data: Prisma.CategoriesCreateInput): Promise<Categories>
    findCategory(name: string): Promise<Categories | null>
}