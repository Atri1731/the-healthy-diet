
import {
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

import { useAuth } from "./AuthContext";

const CartContext = createContext(null);

const API_BASE_URL = (
  import.meta.env.VITE_API_URL || "http://localhost:5001/api"
).replace(/\/$/, "");

function getCartStorageKey(user) {
  if (!user) return "healthyDietCart_guest";

  const accountId = user._id || user.id || user.email;

  if (!accountId) return null;

  return `healthyDietCart_user_${String(accountId)
    .trim()
    .toLowerCase()}`;
}

function readCart(key) {
  if (!key) return [];

  try {
    const savedCart = localStorage.getItem(key);
    const parsedCart = savedCart ? JSON.parse(savedCart) : [];

    return Array.isArray(parsedCart) ? parsedCart : [];
  } catch (error) {
    console.error("Error loading cart:", error);
    return [];
  }
}

export function CartProvider({ children }) {
  const { user, token } = useAuth();

  const isAuthenticated = Boolean(user && token);
  const storageKey = getCartStorageKey(user);

  const [cartState, setCartState] = useState({
    key: storageKey,
    items: [],
  });

  // Load the correct cart when the account or login changes.
  useEffect(() => {
    let cancelled = false;

    setCartState({
      key: storageKey,
      items: [],
    });

    const loadCart = async () => {
      // Guests use their own local cart.
      if (!isAuthenticated || !token) {
        if (!cancelled) {
          setCartState({
            key: storageKey,
            items: readCart(storageKey),
          });
        }
        return;
      }

      try {
        const response = await fetch(
          `${API_BASE_URL}/user-data`,
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (!response.ok) {
          throw new Error("Failed to load cart from server");
        }

        const result = await response.json();
        const items = result.data?.cartItems;

        if (!Array.isArray(items)) {
          throw new Error("Invalid cart response from server");
        }

        if (!cancelled) {
          setCartState({
            key: storageKey,
            items,
          });

          if (storageKey) {
            localStorage.setItem(
              storageKey,
              JSON.stringify(items)
            );
          }
        }
      } catch (error) {
        console.error("Error loading saved cart:", error);

        // Use the local cache if the API is temporarily unavailable.
        if (!cancelled) {
          setCartState({
            key: storageKey,
            items: readCart(storageKey),
          });
        }
      }
    };

    loadCart();

    return () => {
      cancelled = true;
    };
  }, [storageKey, token, isAuthenticated]);

  // Never display the previous account's cart during a switch.
  const cartItems =
    cartState.key === storageKey ? cartState.items : [];

  const saveCart = (items) => {
    // Update the UI immediately.
    setCartState({
      key: storageKey,
      items,
    });

    // Keep a local cache for guests and temporary offline use.
    if (storageKey) {
      try {
        localStorage.setItem(
          storageKey,
          JSON.stringify(items)
        );
      } catch (error) {
        console.error("Error caching cart:", error);
      }
    }

    // Save authenticated customers' carts to MongoDB.
    if (isAuthenticated && token) {
      fetch(`${API_BASE_URL}/user-data/cart`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          cartItems: items,
        }),
      })
        .then(async (response) => {
          if (!response.ok) {
            const result = await response.json().catch(() => ({}));
            throw new Error(
              result.message || "Failed to save cart"
            );
          }
        })
        .catch((error) => {
          console.error("Error saving cart to MongoDB:", error);
        });
    }
  };

  const addToCart = (food) => {
    const existingItem = cartItems.find(
      (item) => String(item.id) === String(food.id)
    );

    const updatedItems = existingItem
      ? cartItems.map((item) =>
          String(item.id) === String(food.id)
            ? {
                ...item,
                quantity: Number(item.quantity || 0) + 1,
              }
            : item
        )
      : [...cartItems, { ...food, quantity: 1 }];

    saveCart(updatedItems);
  };

  const removeFromCart = (id) => {
    saveCart(
      cartItems.filter(
        (item) => String(item.id) !== String(id)
      )
    );
  };

  const increaseQuantity = (id) => {
    saveCart(
      cartItems.map((item) =>
        String(item.id) === String(id)
          ? {
              ...item,
              quantity: Number(item.quantity || 0) + 1,
            }
          : item
      )
    );
  };

  const decreaseQuantity = (id) => {
    saveCart(
      cartItems
        .map((item) =>
          String(item.id) === String(id)
            ? {
                ...item,
                quantity: Number(item.quantity || 0) - 1,
              }
            : item
        )
        .filter((item) => item.quantity > 0)
    );
  };

  const clearCart = () => {
    saveCart([]);
  };

  const cartCount = cartItems.reduce(
    (total, item) => total + Number(item.quantity || 0),
    0
  );

  const cartTotal = cartItems.reduce(
    (total, item) =>
      total +
      Number(item.price || 0) * Number(item.quantity || 0),
    0
  );

  return (
    <CartContext.Provider
      value={{
        cartItems,
        cartCount,
        cartTotal,
        addToCart,
        removeFromCart,
        increaseQuantity,
        decreaseQuantity,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);

  if (!context) {
    throw new Error(
      "useCart must be used inside CartProvider"
    );
  }

  return context;
}