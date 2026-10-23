import {
  useEffect,
  useState,
} from "react";
import { ShopContext } from "./ShopContextValue";

function readStorage(key, fallback) {
  try {
    const value = localStorage.getItem(key);
    return value ? JSON.parse(value) : fallback;
  } catch {
    return fallback;
  }
}

export function ShopProvider({ children }) {
  const [cart, setCart] = useState(() =>
    readStorage("shopsphere-cart", [])
  );

  const [wishlist, setWishlist] = useState(() =>
    readStorage("shopsphere-wishlist", [])
  );

  useEffect(() => {
    localStorage.setItem("shopsphere-cart", JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    localStorage.setItem("shopsphere-wishlist", JSON.stringify(wishlist));
  }, [wishlist]);

  function addToCart(product) {
    setCart((previousCart) => {
      const existing = previousCart.find(
        (item) => item.id === product.id
      );

      if (existing) {
        return previousCart.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }

      return [...previousCart, { ...product, quantity: 1 }];
    });
  }

  function removeFromCart(productId) {
    setCart((previousCart) =>
      previousCart.filter((item) => item.id !== productId)
    );
  }

  function updateQuantity(productId, quantity) {
    const nextQuantity = Math.floor(Number(quantity));

    if (!Number.isFinite(nextQuantity) || nextQuantity < 1) {
      return;
    }

    setCart((previousCart) =>
      previousCart.map((item) =>
        item.id === productId
          ? { ...item, quantity: nextQuantity }
          : item
      )
    );
  }

  function toggleWishlist(product) {
    setWishlist((previousWishlist) => {
      const exists = previousWishlist.some(
        (item) => item.id === product.id
      );

      return exists
        ? previousWishlist.filter((item) => item.id !== product.id)
        : [...previousWishlist, product];
    });
  }

  function isInWishlist(productId) {
    return wishlist.some((item) => item.id === productId);
  }

  const cartCount = cart.reduce(
    (total, item) => total + item.quantity,
    0
  );

  const cartTotal = cart.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  const value = {
    cart,
    wishlist,
    cartCount,
    cartTotal,
    addToCart,
    removeFromCart,
    updateQuantity,
    toggleWishlist,
    isInWishlist,
  };

  return (
    <ShopContext.Provider value={value}>
      {children}
    </ShopContext.Provider>
  );
}
