import { api } from "@/api/customer";

export const addToCartApi = async (
  customerId: string,
  productId: string,
  variantId?: string,
  quantity = 1,
  priceAtTime?: number,
) => {
  const res = await api.post(`/customer/${customerId}/cart`, {
    productId,
    variantId,
    quantity,
    priceAtTime,
  });

  return res.data;
};

export const removeFromCartApi = async (
  customerId: string,
  productId: string,
  variantId?: string,
) => {
  const res = await api.delete(`/customer/${customerId}/cart`, {
    data: { productId, variantId },
  });

  return res.data;
};
