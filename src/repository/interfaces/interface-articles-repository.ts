import {  Articles, Prisma } from "@prisma/client";

export interface articleIdAndManagerIdProps{
    article_id: string
    manager_id: string
}

export interface ShowAllArticles extends Articles {
    manager: {
        name: string
    },
    category: {
        category: string
    }
}

export interface ArticlesRepository {
    create(data: Prisma.ArticlesUncheckedCreateInput): Promise<Articles>
    delete({article_id, manager_id}: articleIdAndManagerIdProps): Promise<Articles>
    deleteByAdmin({article_id}: Omit<articleIdAndManagerIdProps, "manager_id">): Promise<Articles>
    update(data: Prisma.ArticlesUncheckedCreateInput): Promise<Articles>
    showAll(): Promise<ShowAllArticles[] | null>
    showAllByManagerId(manager_id: string): Promise<Articles[]>
    findById(id: string): Promise<ShowAllArticles | null>
    findBySlug(slug: string): Promise<Articles | null>
    findByArticleIdAndManagerId({article_id, manager_id}: articleIdAndManagerIdProps): Promise<Articles | null>
}