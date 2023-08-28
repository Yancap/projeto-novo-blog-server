import { Comments, Prisma} from "@prisma/client";


export interface CommentsWithUserName {
    id: string;
    text: string;
    created_at: string | Date;
    user_name: string;
}

export interface ArticlesCommentsWithUser {
    comments: CommentsWithUserName[],
    article: {
        id: string;
        slug: string;
        title: string;
        category: string;
    }
}

export interface CommentsRepository {
    create(data: Prisma.CommentsUncheckedCreateInput): Promise<Comments>
    delete(id: string): Promise<Comments>
    findById(id: string): Promise<Comments | null>
    findByArticleId(article_id: string): Promise<ArticlesCommentsWithUser | null>;
}