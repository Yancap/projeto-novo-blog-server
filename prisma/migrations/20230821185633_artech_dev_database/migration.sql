-- CreateTable
CREATE TABLE "management" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "hierarchy" TEXT NOT NULL DEFAULT 'author',
    "avatar" TEXT NOT NULL DEFAULT ''
);

-- CreateTable
CREATE TABLE "categories" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "category" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "articles" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "slug" TEXT NOT NULL DEFAULT '',
    "title" TEXT NOT NULL,
    "subtitle" TEXT NOT NULL,
    "text" TEXT NOT NULL,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "state" TEXT NOT NULL DEFAULT 'active',
    "manager_id" TEXT NOT NULL,
    "category_id" TEXT NOT NULL,
    CONSTRAINT "articles_manager_id_fkey" FOREIGN KEY ("manager_id") REFERENCES "management" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "articles_category_id_fkey" FOREIGN KEY ("category_id") REFERENCES "categories" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "credits" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "link" TEXT NOT NULL,
    "article_id" TEXT NOT NULL,
    CONSTRAINT "credits_article_id_fkey" FOREIGN KEY ("article_id") REFERENCES "articles" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "users" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "avatar" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "comments" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "text" TEXT NOT NULL,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "user_id" TEXT NOT NULL,
    "article_id" TEXT NOT NULL,
    CONSTRAINT "comments_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "comments_article_id_fkey" FOREIGN KEY ("article_id") REFERENCES "articles" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "favorite_articles" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "user_id" TEXT NOT NULL,
    "article_id" TEXT NOT NULL,
    CONSTRAINT "favorite_articles_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "favorite_articles_article_id_fkey" FOREIGN KEY ("article_id") REFERENCES "articles" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "tags" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "tag" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "article_tags" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "tag_id" TEXT NOT NULL,
    "article_id" TEXT NOT NULL,
    CONSTRAINT "article_tags_tag_id_fkey" FOREIGN KEY ("tag_id") REFERENCES "tags" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "article_tags_article_id_fkey" FOREIGN KEY ("article_id") REFERENCES "articles" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "management_email_key" ON "management"("email");

-- CreateIndex
CREATE UNIQUE INDEX "categories_category_key" ON "categories"("category");

-- CreateIndex
CREATE UNIQUE INDEX "articles_slug_key" ON "articles"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");

-- CreateIndex
CREATE UNIQUE INDEX "tags_tag_key" ON "tags"("tag");
