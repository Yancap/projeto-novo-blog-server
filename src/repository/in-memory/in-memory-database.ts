import { ArticlesRepository } from "../interfaces/interface-articles-repository";
import { ArticlesTagsRepository } from "../interfaces/interface-articles-tags-repository";
import { CategoriesRepository } from "../interfaces/interface-categories-repository";
import { CreditsRepository } from "../interfaces/interface-credits-repository";
import { ManagementRepository } from "../interfaces/interface-management-repository";
import { TagsRepository } from "../interfaces/interface-tags-repository";
import { InMemoryArticles } from "./in-memory-articles";
import { InMemoryArticleTags } from "./in-memory-articles-tags";
import { InMemoryCategories } from "./in-memory-categories";
import { InMemoryCredits } from "./in-memory-credits";
import { InMemoryManagement } from "./in-memory-management";
import { InMemoryTags } from "./in-memory-tags";

export interface DatabaseMemory {
    categories: CategoriesRepository;
    management: ManagementRepository;
    articles: ArticlesRepository;
    tags: TagsRepository;
    credits: CreditsRepository;
    articlesTags: ArticlesTagsRepository;
}

export class InMemoryDatabase {
    public categories: CategoriesRepository;
    public management: ManagementRepository;
    public articles: ArticlesRepository;
    public tags: TagsRepository;
    public credits: CreditsRepository;
    public articlesTags: ArticlesTagsRepository;

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
    }
}