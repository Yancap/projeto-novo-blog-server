import { ArticlesRepository } from "../interfaces/interface-articles-repository";
import { ArticlesTagsRepository } from "../interfaces/interface-articles-tags-repository";
import { CategoriesRepository } from "../interfaces/interface-categories-repository";
import { CommentsRepository } from "../interfaces/interface-comments-repository";
import { CreditsRepository } from "../interfaces/interface-credits-repository";
import { ManagementRepository } from "../interfaces/interface-management-repository";
import { TagsRepository } from "../interfaces/interface-tags-repository";
import { UsersRepository } from "../interfaces/interface-users-repository";
import { InMemoryArticles } from "./in-memory-articles";
import { InMemoryArticleTags } from "./in-memory-articles-tags";
import { InMemoryCategories } from "./in-memory-categories";
import { InMemoryComments } from "./in-memory-comments";
import { InMemoryCredits } from "./in-memory-credits";
import { InMemoryManagement } from "./in-memory-management";
import { InMemoryTags } from "./in-memory-tags";
import { InMemoryUsers } from "./in-memory-users";

export interface DatabaseMemory {
    categories: CategoriesRepository;
    management: ManagementRepository;
    articles: ArticlesRepository;
    tags: TagsRepository;
    credits: CreditsRepository;
    articlesTags: ArticlesTagsRepository;
    comments: CommentsRepository;
    users: UsersRepository;
}

export class InMemoryDatabase {
    public categories: CategoriesRepository;
    public management: ManagementRepository;
    public articles: ArticlesRepository;
    public tags: TagsRepository;
    public credits: CreditsRepository;
    public articlesTags: ArticlesTagsRepository;
    public comments: CommentsRepository;
    public users: UsersRepository;

    constructor () {
        this.categories = new InMemoryCategories()
        this.management = new InMemoryManagement()
        this.tags = new InMemoryTags()
        this.credits = new InMemoryCredits()
        this.articlesTags = new InMemoryArticleTags({tagsRepository: this.tags})
        this.articles = new InMemoryArticles({ 
            categoriesRepository: this.categories, 
            managementRepository: this.management,
            creditsRepository: this.credits,
            articlesTagsRepository: this.articlesTags
        })
        this.users = new InMemoryUsers()
        this.comments = new InMemoryComments({articlesRepository: this.articles, usersRepository: this.users})
    }
}