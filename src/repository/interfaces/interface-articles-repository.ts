import {  Articles, Prisma } from "@prisma/client";

export interface articleIdAndManagerIdProps{
    article_id: string
    manager_id: string
}

export interface ShowAllArticles extends Articles {
    manager: {
        name: string;
        avatar?: string;
    } | null,
    category: {
        category: string
    }
}
export interface FindArticlesBySlug extends ShowAllArticles {
    credits: {
        name: string;
        link: string;
    }[],
    articleTags: {
        tag: {
            tag: string;
        };
    }[];
}

export interface ShowAll {
    id: string;
    slug: string;
    title: string;
    subtitle: string;
    image: string;
    text: string;
    created_at: Date;
    state: string;
    manager_id: string | null;
    category_id: string;
}

export interface ArticlesRepository {
    create(data: Prisma.ArticlesUncheckedCreateInput): Promise<Articles>;
    delete({article_id, manager_id}: articleIdAndManagerIdProps): Promise<Articles>;
    deleteByAdmin({article_id}: Omit<articleIdAndManagerIdProps, "manager_id">): Promise<Articles>;
    update(data: Prisma.ArticlesUncheckedCreateInput): Promise<Articles>;
    showAll(): Promise<({} & ShowAll)[]>;
    showAllForClients(): Promise<({} & ShowAll)[]>;
    showAllByManagerId(manager_id: string): Promise<Articles[]>;
    findById(id: string): Promise<({} & ShowAll) | null>;
    findBySlug(slug: string):  Promise<({} & ShowAll) | null>;
    findByCategory(category: string): Promise<({} & ShowAll)[]>;
    findByArticleIdAndManagerId({article_id, manager_id}: articleIdAndManagerIdProps): Promise<Articles | null>;
}