"use server";

import { prisma } from "./db";
import { revalidatePath } from "next/cache";

// 全店舗取得
export async function getShops() {
  try {
    const shops = await prisma.shop.findMany({
      where: { isActive: true },
      orderBy: { sortOrder: "asc" },
      include: {
        reviews: {
          orderBy: { createdAt: "desc" },
          take: 10,
        },
      },
    });
    return shops;
  } catch (error) {
    console.error("Error fetching shops:", error);
    return [];
  }
}

// 特定店舗取得
export async function getShop(id: string) {
  try {
    const shop = await prisma.shop.findUnique({
      where: { id },
      include: {
        reviews: {
          orderBy: { createdAt: "desc" },
        },
      },
    });
    return shop;
  } catch (error) {
    console.error("Error fetching shop:", error);
    return null;
  }
}

// 口コミ投稿
export async function createReview(data: {
  shopId: string;
  userName?: string;
  content: string;
  images?: string[];
  rating?: number;
  tags?: string[];
}) {
  try {
    const review = await prisma.review.create({
      data: {
        shopId: data.shopId,
        userName: data.userName || "匿名",
        content: data.content,
        images: data.images || [],
        rating: data.rating,
        tags: data.tags || [],
      },
    });
    revalidatePath("/");
    revalidatePath(`/shop/${data.shopId}`);
    return { success: true, review };
  } catch (error) {
    console.error("Error creating review:", error);
    return { success: false, error: "口コミの投稿に失敗しました" };
  }
}

// 口コミ削除
export async function deleteReview(reviewId: string, shopId: string) {
  try {
    await prisma.review.delete({
      where: { id: reviewId },
    });
    revalidatePath("/");
    revalidatePath(`/shop/${shopId}`);
    return { success: true };
  } catch (error) {
    console.error("Error deleting review:", error);
    return { success: false, error: "口コミの削除に失敗しました" };
  }
}

// 応援カウント（簡易版 - 実際はセッション管理が必要）
export async function cheerShop(shopId: string) {
  try {
    // 実装案: Cookieやセッションでユーザーごとの応援済みを管理
    // ここでは簡易的に実装
    return { success: true };
  } catch (error) {
    console.error("Error cheering shop:", error);
    return { success: false };
  }
}

// 統計情報取得
export async function getStats() {
  try {
    const shopCount = await prisma.shop.count({ where: { isActive: true } });
    const reviewCount = await prisma.review.count();

    return {
      shops: shopCount,
      reviews: reviewCount,
      cheers: 0, // 応援機能は別途実装
    };
  } catch (error) {
    console.error("Error fetching stats:", error);
    return { shops: 0, reviews: 0, cheers: 0 };
  }
}
