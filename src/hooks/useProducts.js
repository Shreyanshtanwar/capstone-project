import { useEffect, useState } from "react";
import { getProducts } from "../services/productServices";

export default function useProducts() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const controller = new AbortController();

    async function loadProducts() {
      try {
        setLoading(true);
        setError("");

        const data = await getProducts(controller.signal);
        setProducts(data);
      } catch (err) {
        if (err.name !== "AbortError") {
          setError(
            err.message || "Something went wrong while loading products."
          );
        }
      } finally {
        if (!controller.signal.aborted) {
          setLoading(false);
        }
      }
    }

    loadProducts();

    return () => controller.abort();
  }, []);

  return { products, loading, error };
}