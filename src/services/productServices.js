const API_URL = "https://fakestoreapi.com/products";

export async function getProducts(signal) {
  const response = await fetch(API_URL, { signal });

  if (!response.ok) {
    throw new Error("Unable to load products. Please try again.");
  }

  return response.json();
}

export async function getProductById(id, signal) {
  const response = await fetch(`${API_URL}/${id}`, { signal });

  if (!response.ok) {
    throw new Error("Product not found.");
  }

  return response.json();
}