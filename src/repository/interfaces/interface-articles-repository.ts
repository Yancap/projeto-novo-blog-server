import { Articles, Prisma} from "@prisma/client";

export interface ArticlesRepository {
    create(data: Prisma.ArticlesUncheckedCreateInput): Promise<Articles>
}