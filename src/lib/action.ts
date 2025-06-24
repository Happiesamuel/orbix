"use server";

import axios from "axios";

export async function getProdoucts() {
  try {
    const response = await axios.get(
      "https://dummyjson.com/products?limit=200"
    );
    return response.data;
  } catch (err) {
    throw new Error(err instanceof Error ? err.message : "Unknown error");
  }
}
export async function getProdouct(id: string) {
  try {
    const response = await axios.get(`https://dummyjson.com/products/${id}`);
    return response.data;
  } catch (err) {
    throw new Error(err instanceof Error ? err.message : "Unknown error");
  }
}
