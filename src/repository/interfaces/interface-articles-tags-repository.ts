import { ArticlesTags, Prisma} from "@prisma/client";

interface SelectTags {
    tag: {
        tag: string
    }
}

export interface ArticlesTagsRepository {
    create(data: Prisma.ArticlesTagsUncheckedCreateInput): Promise<ArticlesTags>
    findById(id: string): Promise<ArticlesTags | null>
    selectTagsByArticleId(article_id: string): Promise<SelectTags[] | null>
    selectByTagsId(tag_id: string): Promise<ArticlesTags[] | null>
    //selectArticlesTags(): void; //Todo
}