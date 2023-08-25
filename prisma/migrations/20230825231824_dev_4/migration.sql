-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_articles" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "slug" TEXT NOT NULL DEFAULT '',
    "title" TEXT NOT NULL,
    "subtitle" TEXT NOT NULL,
    "image" TEXT NOT NULL,
    "text" TEXT NOT NULL,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "state" TEXT NOT NULL DEFAULT 'active',
    "manager_id" TEXT,
    "category_id" TEXT NOT NULL,
    CONSTRAINT "articles_manager_id_fkey" FOREIGN KEY ("manager_id") REFERENCES "management" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "articles_category_id_fkey" FOREIGN KEY ("category_id") REFERENCES "categories" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_articles" ("category_id", "created_at", "id", "image", "manager_id", "slug", "state", "subtitle", "text", "title") SELECT "category_id", "created_at", "id", "image", "manager_id", "slug", "state", "subtitle", "text", "title" FROM "articles";
DROP TABLE "articles";
ALTER TABLE "new_articles" RENAME TO "articles";
CREATE UNIQUE INDEX "articles_slug_key" ON "articles"("slug");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
