import { CategoryType } from "@/types/types";
import { api } from "./customer";
import { cache } from "react";

export type CategoryUI = {
  parent: {
    id: string;
    name: string;
    image: string;
  };
  subCategories: {
    id?: string;
    name: string;
    image: string;
  }[];
};

// Accept page and limit as arguments
export const fetchCategories = cache(async (page: number = 1, limit: number = 10): Promise<CategoryUI[]> => {
  // Pass params to your API
  const res = await api(`/category?limit=${limit}&page=${page}`);

  if (!res.status || res.status !== 200) {
    throw new Error("Failed to fetch categories");
  }

  const json = await res.data;
  const categories: CategoryType[] = json.categories || [];

  const grouped: CategoryUI[] = [];
  const activeCategories = categories
  .filter((cat : CategoryType) => cat.status !== false)
  .sort((a, b) => {
    return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
  });
  // console.log("activeCategories", activeCategories);

  for (const parent of activeCategories) {
    // ... (Keep your existing mapping logic here) ...
    const subCategories = (parent.children || [])
      .filter(
        (child) =>
          child.type?.toLowerCase() === "sub" &&
          child.name &&
          child.status !== false,
      )
      .map((child) => ({
        id: child.id,
        name: child.name!,
        image:
          child.image?.url ||
          parent.image?.url ||
          "/assets/home/category/plants.png",
      }));

    grouped.push({
      parent: {
        id: parent.categoryId,
        name: parent.name,
        image: parent.image?.url || "/assets/home/category/plants.png",
      },
      subCategories,
    });
  }  

  return grouped;
});