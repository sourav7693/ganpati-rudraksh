import { CategoryType } from "@/types/types";
import axios from "axios";

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
export async function fetchCategories(page: number = 1, limit: number = 10): Promise<CategoryUI[]> {
  // Pass params to your API
  const res = await axios(`${process.env.NEXT_PUBLIC_API_URL}/category?limit=${limit}&page=${page}`);

  if (!res.status || res.status !== 200) {
    throw new Error("Failed to fetch categories");
  }

  const json = await res.data;
  const categories: CategoryType[] = json.categories || [];

  const grouped: CategoryUI[] = [];

  for (const parent of categories) {
    // ... (Keep your existing mapping logic here) ...
    const subCategories = (parent.children || [])
      .filter(
        (child) =>
          child.type?.toLowerCase() === "sub" &&
          child.name &&
          child.status !== false
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
}