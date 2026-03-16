import { api } from "./customer";

export const toggleWishlistApi = async (customerId?: string, productId?: string) => {
  const res = await api.post(
    `${process.env.NEXT_PUBLIC_API_URL}/customer/${customerId}/wishlist`,
    { productId },    
  );
  return res.data; // { message, wishlist }
};


export const removeWishlistApi = (customerId: string, productId: string) => {
  return api.delete(`${process.env.NEXT_PUBLIC_API_URL}/customer/remove-wishlist/${customerId}/${productId}`);
};