import { api } from "./customer";

export const addToCartApi = async (
  customerId: string,
  productId: string,
  variantId?: string,
  quantity = 1,
  priceAtTime?: number
) => {
  const res = await api.post(
    `${process.env.NEXT_PUBLIC_API_URL}/customer/${customerId}/cart`,
    { productId, variantId, quantity, priceAtTime },    
  );

  return res.data;
};

export const removeFromCartApi = async (
  customerId: string,
  productId: string,
  variantId?: string
) => {
  const res = await api.delete(
    `${process.env.NEXT_PUBLIC_API_URL}/customer/${customerId}/cart`,
    {
      data: { productId, variantId },      
    }
  );

  return res.data;
};
