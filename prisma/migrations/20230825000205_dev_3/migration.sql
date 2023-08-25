-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_article_tags" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "tag_id" TEXT NOT NULL,
    "article_id" TEXT,
    CONSTRAINT "article_tags_tag_id_fkey" FOREIGN KEY ("tag_id") REFERENCES "tags" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "article_tags_article_id_fkey" FOREIGN KEY ("article_id") REFERENCES "articles" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_article_tags" ("article_id", "id", "tag_id") SELECT "article_id", "id", "tag_id" FROM "article_tags";
DROP TABLE "article_tags";
ALTER TABLE "new_article_tags" RENAME TO "article_tags";
CREATE TABLE "new_comments" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "text" TEXT NOT NULL,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "user_id" TEXT NOT NULL,
    "article_id" TEXT,
    CONSTRAINT "comments_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "comments_article_id_fkey" FOREIGN KEY ("article_id") REFERENCES "articles" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_comments" ("article_id", "created_at", "id", "text", "user_id") SELECT "article_id", "created_at", "id", "text", "user_id" FROM "comments";
DROP TABLE "comments";
ALTER TABLE "new_comments" RENAME TO "comments";
CREATE TABLE "new_favorite_articles" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "user_id" TEXT NOT NULL,
    "article_id" TEXT,
    CONSTRAINT "favorite_articles_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "favorite_articles_article_id_fkey" FOREIGN KEY ("article_id") REFERENCES "articles" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_favorite_articles" ("article_id", "id", "user_id") SELECT "article_id", "id", "user_id" FROM "favorite_articles";
DROP TABLE "favorite_articles";
ALTER TABLE "new_favorite_articles" RENAME TO "favorite_articles";
CREATE TABLE "new_credits" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "link" TEXT NOT NULL,
    "article_id" TEXT,
    CONSTRAINT "credits_article_id_fkey" FOREIGN KEY ("article_id") REFERENCES "articles" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_credits" ("article_id", "id", "link", "name") SELECT "article_id", "id", "link", "name" FROM "credits";
DROP TABLE "credits";
ALTER TABLE "new_credits" RENAME TO "credits";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
