import axios from "axios";

export async function fetchProducts(query: string = "") {
    const PRODUCT_LIMIT = 10;
  try {
    const res = await axios(
      `${process.env.NEXT_PUBLIC_API_URL}/product?limit=${PRODUCT_LIMIT}&status=Active&page=1&${query}`);
    if (!res.status || res.status !== 200) throw new Error("Failed to fetch");
    return res.data;
  } catch (err) {
    console.log(err);
    return { data: [], pagination: { totalPages: 0 } };
  }
}

export async function fetchProductBySlug(slug: string) {
  try {
    const res = await axios(
      `${process.env.NEXT_PUBLIC_API_URL}/product/${slug}`,
    );
    if (!res.status || res.status !== 200) throw new Error("Product fetch failed");
    return res.data;
  } catch (err) {
    console.log(err);
    return null;
  }
}

export const fetchRelatedProducts = async (slug: string) => {
   try {
     const res = await axios(
       `${process.env.NEXT_PUBLIC_API_URL}/product/${slug}/related?status=Active`,
     );
     if (!res.status || res.status !== 200) throw new Error("Failed to fetch related products");

     return res.data;
   } catch (err) {
     console.error("Failed to fetch related products", err);
     return []; 
   }
}

export const checkPinCodeServiceability = async (pinCode: string) => {
  try {
    const res = await axios.post(
      `${process.env.NEXT_PUBLIC_API_URL}/shiprocket/serviceability`, {
        delivery_postcode: pinCode,
      }
    );
    if (!res.status || res.status !== 200) throw new Error("Product fetch failed");
    if(!res.data.success) throw new Error("Service not available at this location");
    return res;
  } catch (err) {
    console.log(err);
    return null;
  }
};
