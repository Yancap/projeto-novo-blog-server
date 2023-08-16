import { ArticlesTags, Prisma} from "@prisma/client";

export interface ArticlesTagsRepository {
    create(data: Prisma.ArticlesTagsUncheckedCreateInput): Promise<ArticlesTags>
    selectByArticleId(article_id: string): Promise<ArticlesTags[] | null>
    selectByTagsId(tag_id: string): Promise<ArticlesTags[] | null>
}