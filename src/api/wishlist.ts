import { api } from "@/api/customer";

export const toggleWishlistApi = async (customerId?: string, productId?: string) => {
  const res = await api.post(
    `/customer/${customerId}/wishlist`,
    { productId }
  );
  return res.data; // { message, wishlist }
};


export const removeWishlistApi = (customerId: string, productId: string) => {
  return api.delete(`/customer/remove-wishlist/${customerId}/${productId}`);
};