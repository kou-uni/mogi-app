-- CreateTable
CREATE TABLE "shops" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "category" TEXT NOT NULL,
    "description" TEXT,
    "address" TEXT NOT NULL,
    "phone_number" TEXT,
    "image_url" TEXT,
    "images" TEXT[],
    "qr_code" TEXT,
    "specialty" TEXT[],
    "opening_hours" TEXT,
    "closed_days" TEXT,
    "is_active" BOOLEAN NOT NULL DEFAULT true,
    "sort_order" INTEGER NOT NULL DEFAULT 0,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "shops_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "reviews" (
    "id" TEXT NOT NULL,
    "shop_id" TEXT NOT NULL,
    "user_name" TEXT,
    "content" TEXT NOT NULL,
    "images" TEXT[],
    "rating" INTEGER,
    "tags" TEXT[],
    "is_public" BOOLEAN NOT NULL DEFAULT true,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "reviews_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "guides" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "role" TEXT NOT NULL,
    "introduction" TEXT,
    "photo_url" TEXT,
    "profile_text" TEXT,
    "specialty" TEXT,
    "is_active" BOOLEAN NOT NULL DEFAULT true,
    "sort_order" INTEGER NOT NULL DEFAULT 0,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "guides_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "guide_shop_recommendations" (
    "id" TEXT NOT NULL,
    "guide_id" TEXT NOT NULL,
    "shop_id" TEXT NOT NULL,
    "recommend_text" TEXT,
    "sort_order" INTEGER NOT NULL DEFAULT 0,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "guide_shop_recommendations_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "guide_routes" (
    "id" TEXT NOT NULL,
    "guide_id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "shop_ids" TEXT[],
    "duration" TEXT,
    "distance" TEXT,
    "map_image_url" TEXT,
    "is_public" BOOLEAN NOT NULL DEFAULT true,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "guide_routes_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "tickets" (
    "id" TEXT NOT NULL,
    "user_id" TEXT,
    "shop_id" TEXT NOT NULL,
    "ticket_code" TEXT NOT NULL,
    "amount" INTEGER NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'unused',
    "purchased_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "used_at" TIMESTAMP(3),
    "expires_at" TIMESTAMP(3),

    CONSTRAINT "tickets_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "system_settings" (
    "key" TEXT NOT NULL,
    "value" TEXT NOT NULL,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "system_settings_pkey" PRIMARY KEY ("key")
);

-- CreateIndex
CREATE UNIQUE INDEX "guide_shop_recommendations_guide_id_shop_id_key" ON "guide_shop_recommendations"("guide_id", "shop_id");

-- CreateIndex
CREATE UNIQUE INDEX "tickets_ticket_code_key" ON "tickets"("ticket_code");

-- AddForeignKey
ALTER TABLE "reviews" ADD CONSTRAINT "reviews_shop_id_fkey" FOREIGN KEY ("shop_id") REFERENCES "shops"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "guide_shop_recommendations" ADD CONSTRAINT "guide_shop_recommendations_guide_id_fkey" FOREIGN KEY ("guide_id") REFERENCES "guides"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "guide_shop_recommendations" ADD CONSTRAINT "guide_shop_recommendations_shop_id_fkey" FOREIGN KEY ("shop_id") REFERENCES "shops"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "guide_routes" ADD CONSTRAINT "guide_routes_guide_id_fkey" FOREIGN KEY ("guide_id") REFERENCES "guides"("id") ON DELETE CASCADE ON UPDATE CASCADE;
