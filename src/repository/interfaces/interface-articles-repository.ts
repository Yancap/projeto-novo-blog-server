import { Articles, Prisma} from "@prisma/client";

export interface findByArticleIdAndManagerIdProps{
    article_id: string
    manager_id: string
}

export interface ArticlesRepository {
    create(data: Prisma.ArticlesUncheckedCreateInput): Promise<Articles>
    delete(id: string): Promise<Articles[] | null>
    update(data: Prisma.ArticlesUncheckedCreateInput): Promise<Articles>
    findById(id: string): Promise<Articles | null>
    findBySlug(slug: string): Promise<Articles | null>

    findByArticleIdAndManagerId({article_id, manager_id}: findByArticleIdAndManagerIdProps): Promise<Articles | null>
}