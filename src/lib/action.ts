"use server";

import axios from "axios";

export async function getProdoucts() {
  try {
    const response = await axios.get(`${process.env.API_URL}?limit=200`);
    return response.data;
  } catch (err) {
    throw new Error(err instanceof Error ? err.message : "Unknown error");
  }
}
export async function getProdouct(id: string) {
  try {
    const response = await axios.get(
      `${process.env.API_URL}/${id}`
    );
    return response.data;
  } catch (err) {
    throw new Error(err instanceof Error ? err.message : "Unknown error");
  }
}
export async function getProductCategory(category: string) {
  try {
    const response = await axios.get(
      `${process.env.API_URL}/category/${category}`
    );
    return response.data;
  } catch (err) {
    throw new Error(err instanceof Error ? err.message : "Unknown error");
  }
}
export async function searchProduct(query: string) {
  try {
    const response = await axios.get(
      `${process.env.API_URL}/search?q=${query}`
    );
    return response.data;
  } catch (err) {
    throw new Error(err instanceof Error ? err.message : "Unknown error");
  }
}
