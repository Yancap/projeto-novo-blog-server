import { PrismaArticlesTagsRepository } from "../../repository/prisma/prisma-articles-tags"
import { PrismaTagsRepository } from "../../repository/prisma/prisma-tags"
import { GetTagsByArticleId } from "../../services/tags/get-tags-by-article-id"

export function makeGetTagsByArticleId(){
    const getTagsByArticleId = new GetTagsByArticleId(
        new PrismaTagsRepository,
        new PrismaArticlesTagsRepository
    )
    return getTagsByArticleId
}